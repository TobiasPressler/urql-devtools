import React, { useContext } from "react";
import { ExplorerContext } from "../../context";
import { Background } from "../../components";
import { Tree, NodeInfoPane } from "./components";
import {
  container,
  listContainer,
  titleWrapper,
  title,
  description,
} from "./Explorer.css";

export const Explorer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { operations } = useContext(ExplorerContext);

  return (
    <Background {...props} className={`${container} ${props.className || ""}`}>
      <section className={listContainer}>
        {Object.keys(operations).length ? (
          <Tree nodeMap={operations} />
        ) : (
          <div className={titleWrapper}>
            <h2 className={title}>Responses will be shown here</h2>
            <p className={description}>
              Make a new request or refresh the page
            </p>
          </div>
        )}
      </section>
      <NodeInfoPane />
    </Background>
  );
};
