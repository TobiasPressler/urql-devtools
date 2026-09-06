vi.mock("./Devtools");
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mocked,
} from "vitest";
import { useContext } from "react";
import { render, act } from "@testing-library/react";
import {
  getIntrospectionQuery,
  parse,
  buildSchema,
  introspectionFromSchema,
} from "graphql";
import { useDevtoolsContext } from "./Devtools";
import { RequestProvider, RequestContext } from "./Request";

const sendMessage = vi.fn();
const addMessageHandler = vi.fn();
const getItem = vi.spyOn(Storage.prototype, "getItem");
const setItem = vi.spyOn(Storage.prototype, "setItem");

beforeEach(() => {
  (useDevtoolsContext as Mocked<any>).mockReturnValue({
    client: {
      connected: true,
      version: {
        actual: "9.9.9",
        required: "9.9.9",
        mismatch: false,
      },
    },
    sendMessage,
    addMessageHandler,
  });
});

beforeEach(vi.clearAllMocks);

let state: any;

const Fixture = () => {
  state = useContext(RequestContext);
  return null;
};

describe("on mount", () => {
  beforeEach(() => {
    getItem.mockReturnValue(null);
    render(
      <RequestProvider>
        <Fixture />
      </RequestProvider>,
    );
  });

  it("listens for events", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
  });

  it("triggers schema request", () => {
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith({
      type: "execute-query",
      source: "devtools",
      query: getIntrospectionQuery(),
    });
  });

  it("does not persist query to local storage", () => {
    expect(setItem).toHaveBeenCalledTimes(0);
  });

  describe("state", () => {
    it("matches snapshot", () => {
      expect(state).toMatchInlineSnapshot(`
        {
          "error": undefined,
          "execute": [Function],
          "fetching": false,
          "query": undefined,
          "response": undefined,
          "schema": undefined,
          "setQuery": [Function],
        }
      `);
    });
  });
});

describe("on remount", () => {
  beforeEach(() => {
    getItem.mockReturnValue("query { _id }");
    render(
      <RequestProvider>
        <Fixture />
      </RequestProvider>,
    );
  });

  afterEach(() => {
    getItem.mockReturnValue(null);
  });

  describe("state", () => {
    it("matches snapshot", () => {
      expect(state).toMatchInlineSnapshot(`
        {
          "error": undefined,
          "execute": [Function],
          "fetching": false,
          "query": "query { _id }",
          "response": undefined,
          "schema": undefined,
          "setQuery": [Function],
        }
      `);
    });
  });
});

describe("on setQuery", () => {
  const query = "stub query";

  beforeEach(() => {
    render(
      <RequestProvider>
        <Fixture />
      </RequestProvider>,
    );
    act(() => {
      state.setQuery(query);
    });
  });

  it("persists query to local storage", () => {
    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith("urql-last-request", query);
  });

  describe("state", () => {
    it("contains new query value", () => {
      expect(state.query).toEqual(query);
    });
  });
});

describe("on execute", () => {
  const query = "stub query";

  beforeEach(() => {
    render(
      <RequestProvider>
        <Fixture />
      </RequestProvider>,
    );
    sendMessage.mockClear();
    act(() => {
      state.setQuery(query);
    });
    act(() => {
      state.execute();
    });
  });

  describe("state", () => {
    it("is fetching", () => {
      expect(state).toHaveProperty("fetching", true);
    });
  });

  describe("send message", () => {
    it("is called", () => {
      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith({
        type: "execute-query",
        source: "devtools",
        query,
      });
    });
  });
});

describe("on debug message", () => {
  beforeEach(() => {
    render(
      <RequestProvider>
        <Fixture />
      </RequestProvider>,
    );
    act(() => {
      state.execute();
    });
  });

  describe("on schema update", () => {
    const schema = `
      schema {
        query: Simple
      }
      
      type Simple {
        string: String
      }
    `;
    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug-event",
          source: "exchange",
          data: {
            type: "update",
            operation: {
              query: parse(getIntrospectionQuery()),
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: introspectionFromSchema(buildSchema(schema)),
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          {
            "error": undefined,
            "execute": [Function],
            "fetching": true,
            "query": undefined,
            "response": undefined,
            "schema": GraphQLSchema {
              "__kind": Symbol(Schema),
              "__validationErrors": undefined,
              "_directives": [
                "@include",
                "@skip",
                "@deprecated",
                "@specifiedBy",
                "@oneOf",
                "@populate",
              ],
              "_implementationsMap": {},
              "_mutationType": null,
              "_queryType": "Simple",
              "_subTypeMap": Map {},
              "_subscriptionType": null,
              "_typeMap": {
                "Boolean": "Boolean",
                "Simple": "Simple",
                "String": "String",
                "__Directive": "__Directive",
                "__DirectiveLocation": "__DirectiveLocation",
                "__EnumValue": "__EnumValue",
                "__Field": "__Field",
                "__InputValue": "__InputValue",
                "__Schema": "__Schema",
                "__Type": "__Type",
                "__TypeKind": "__TypeKind",
              },
              "assumeValid": false,
              "astNode": undefined,
              "description": null,
              "extensionASTNodes": [],
              "extensions": {},
            },
            "setQuery": [Function],
          }
        `);
      });
    });
  });

  describe("on update", () => {
    const response = { test: "response" };

    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug-event",
          source: "exchange",
          data: {
            type: "update",
            operation: {
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: response,
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          {
            "execute": [Function],
            "fetching": false,
            "query": undefined,
            "response": {
              "test": "response",
            },
            "schema": undefined,
            "setQuery": [Function],
          }
        `);
      });
    });
  });

  describe("on error", () => {
    const error = { test: "error" };

    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug-event",
          source: "exchange",
          data: {
            type: "error",
            operation: {
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: error,
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          {
            "error": {
              "test": "error",
            },
            "execute": [Function],
            "fetching": false,
            "query": undefined,
            "schema": undefined,
            "setQuery": [Function],
          }
        `);
      });
    });
  });
});
