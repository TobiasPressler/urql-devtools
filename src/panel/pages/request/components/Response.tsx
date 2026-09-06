import React, { useContext, useMemo } from "react";
import { RequestContext } from "../../../context";
import { CodeHighlight, Pane } from "../../../components";
import { prompt, status, icon } from "./Response.css";

export const Response: React.FC = () => {
  const { fetching, response, error } = useContext(RequestContext);

  const { state, code } = useMemo(() => {
    if (fetching) {
      return {
        state: "Fetching",
        code: null,
      };
    }

    if (response) {
      return {
        state: "Success",
        code: (
          <CodeHighlight
            code={JSON.stringify(response, null, 2)}
            language="javascript"
          />
        ),
      };
    }

    if (error) {
      return {
        state: "Error",
        code: (
          <CodeHighlight
            code={JSON.stringify(error, null, 2)}
            language="javascript"
          />
        ),
      };
    }

    return {
      state: "Idle",
      code: null,
    };
  }, [fetching, response, error]);

  return useMemo(() => {
    if (state === "Idle") {
      return (
        <div className={prompt}>
          Run a query to see what the client returns...
        </div>
      );
    }

    return (
      <>
        <Pane.Item>
          <Pane.ItemTitle>State</Pane.ItemTitle>
          <code className={status}>
            <span data-state={state.toLowerCase()} className={icon} /> {state}
          </code>
        </Pane.Item>

        {code && (
          <Pane.Item>
            <Pane.ItemTitle>Response</Pane.ItemTitle>
            {code}
          </Pane.Item>
        )}
      </>
    );
  }, [code, state]);
};
