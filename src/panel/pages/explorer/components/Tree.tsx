import React, { FC } from "react";
import { ParsedNodeMap, ParsedFieldNode } from "../../../context/Explorer/ast";
import { ListItem, SystemListItem } from "./ListItem";
import { list } from "./Tree.css";

interface TreeProps {
  nodeMap: ParsedNodeMap | (ParsedNodeMap | null)[] | undefined;
  depth?: number;
  index?: number;
}

export const Tree: FC<TreeProps> = ({ nodeMap, depth = 0, index }) => {
  if (!nodeMap || (Array.isArray(nodeMap) && nodeMap.length === 0)) {
    return null;
  }

  if (Array.isArray(nodeMap)) {
    return (
      <>
        {nodeMap.map(
          (map, index) =>
            map && (
              <Tree key={index} nodeMap={map} depth={depth} index={index} />
            )
        )}
      </>
    );
  }

  const fields = Object.values(nodeMap);
  const typenameField = fields.find((x) => x.name === "__typename");
  const childrenFields = sortFields(
    fields.filter((x) => x.children !== undefined)
  );
  const scalarFields = sortFields(
    fields.filter((x) => x.children === undefined && x.name !== "__typename")
  );
  const role = depth === 0 ? "tree" : "group";

  return (
    <ul role={role} key={index} className={list}>
      {typenameField && <SystemListItem node={typenameField} index={index} />}
      {[...scalarFields, ...childrenFields].map((node) => (
        <ListItem key={node._id} node={node} depth={depth} />
      ))}
    </ul>
  );
};

const sortFields = (nodes: ParsedFieldNode[]) => {
  return nodes.sort((a, b) => {
    if (a.name === "id") {
      return -nodes.length;
    }

    if (b.name === "id") {
      return nodes.length;
    }

    return a.name.localeCompare(b.name);
  });
};
