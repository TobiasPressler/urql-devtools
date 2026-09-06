import React, { FC, useMemo, Fragment } from "react";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { InlineCodeHighlight } from "../../../components";
import { argumentText } from "./Arguments.css";

export const Arguments: FC<
  {
    args?: ParsedFieldNode["args"];
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ args, ...props }) => {
  if (!args) {
    return null;
  }

  const entries = useMemo(() => Object.entries(args), [args]);

  return (
    <div {...props} className={`${argumentText} ${props.className || ""}`}>
      (
      {entries.map(([key, value], index) => (
        <Fragment key={key}>
          {`${key}: `}
          <InlineCodeHighlight
            code={JSON.stringify(value) || "undefined"}
            language="javascript"
          />
          {index !== entries.length - 1 && ", "}
        </Fragment>
      ))}
      )
    </div>
  );
};
