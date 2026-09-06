import "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror-graphql/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/mode";
import CodeMirror from "codemirror";

type ShowHintOptions = any;
import React, { useEffect, useState } from "react";
import { useRequest } from "../../../context";
import { container } from "./Query.css";

export const Query: React.FC = () => {
  const [codemirror, setCodeMirror] = useState<CodeMirror.Editor | undefined>();
  const { query, setQuery, execute, schema } = useRequest();

  useEffect(() => {
    if (codemirror === undefined) {
      return;
    }

    codemirror.setOption("extraKeys", {
      ...(codemirror.getOption("extraKeys") as CodeMirror.KeyMap),
      "Ctrl-Enter": execute,
      "Cmd-Enter": execute,
    });
  }, [codemirror, execute]);

  useEffect(() => {
    if (codemirror === undefined || schema === undefined) {
      return;
    }

    codemirror.setOption("lint", ({ schema } as any));
    codemirror.setOption("hintOptions", ({
      schema,
    } as unknown) as ShowHintOptions);
    codemirror.setOption("extraKeys", {
      "Ctrl-Space": () =>
        codemirror.showHint(({
          completeSingle: true,
        } as unknown) as ShowHintOptions),
    });
  }, [codemirror, schema]);

  useEffect(() => {
    if (!codemirror) {
      return;
    }

    if (query !== undefined && query !== codemirror.getValue()) {
      codemirror.setValue(query);
    }
  }, [query, codemirror]);

  const handleRef = (ref: HTMLTextAreaElement) => {
    if (ref === null || codemirror !== undefined) {
      return;
    }

    const editor = CodeMirror.fromTextArea(ref, {
      mode: "graphql",
      tabSize: 2,
      lineNumbers: true,
      autoCloseBrackets: "{}[]\"\"''",
      matchBrackets: true,
    });

    editor.on("change", () => setQuery(editor.getValue()));

    setCodeMirror(editor);
  };

  return (
    <div className={container}>
      <textarea
        id="query-text-box"
        ref={handleRef}
        defaultValue={
          query ||
          "# Type your query here then hit 'Ctrl+Enter' to execute it.\n"
        }
      />
    </div>
  );
};
