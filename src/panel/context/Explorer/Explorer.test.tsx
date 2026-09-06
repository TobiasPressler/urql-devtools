vi.mock("../Devtools");
vi.mock("./ast");
import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { useContext } from "react";
import { render, act } from "@testing-library/react";
import { useDevtoolsContext } from "../Devtools";
import { ExplorerProvider, ExplorerContext } from "../Explorer";
import { defaultEvents } from "../../pages/explorer/Explorer.fixture";
import { handleResponse } from "./ast";
const sendMessage = vi.fn();
const addMessageHandler = vi.fn();

beforeEach(() => {
  (useDevtoolsContext as Mocked<any>).mockReturnValue({
    client: {
      connected: true,
      version: {
        required: "9.9.9",
        mismatch: false,
        actual: "9.9.9",
      },
    },
    sendMessage,
    addMessageHandler,
  });
});

beforeEach(vi.clearAllMocks);

let state: any;

const Fixture = () => {
  state = useContext(ExplorerContext);
  return null;
};

describe("on mount", () => {
  beforeEach(() => {
    render(
      <ExplorerProvider>
        <Fixture />
      </ExplorerProvider>,
    );
  });

  it("listens for events", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
  });

  describe("state", () => {
    it("matches snapshot", () => {
      expect(state).toMatchInlineSnapshot(`
        {
          "expandedNodes": [],
          "focusedNode": undefined,
          "operations": {},
          "setExpandedNodes": [Function],
          "setFocusedNode": [Function],
        }
      `);
    });
  });
});

describe("DebugMessage", () => {
  beforeEach(async () => {
    addMessageHandler.mockImplementationOnce((cb) => cb(defaultEvents[0]));
    act(() => {
      render(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>,
      );
    });
  });
  it("calls handleResponse with the correct message ", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: defaultEvents[0].data.operation,
        data: defaultEvents[0].data.data.value,
      }),
    );
  });
});

describe("unknown message", () => {
  beforeEach(() => {
    addMessageHandler.mockImplementationOnce((cb) => cb({ type: "unknown" }));
  });
  it("doesn't call handleResponse", () => {
    render(
      <ExplorerProvider>
        <Fixture />
      </ExplorerProvider>,
    );
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledTimes(0);
  });
});

describe("disconnect message", () => {
  beforeEach(async () => {
    addMessageHandler.mockImplementationOnce((cb) => cb(defaultEvents[0]));
    act(() => {
      render(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>,
      );
    });
    addMessageHandler.mockImplementationOnce((cb) =>
      cb({ type: "disconnect" }),
    );
    act(() => {
      render(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>,
      );
    });
  });
  it("doesn't call handleResponse and resets the operations", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(2);
    expect(handleResponse).toHaveBeenCalledTimes(1);

    expect(state).toEqual(
      expect.objectContaining({
        operations: {},
      }),
    );
  });
});
