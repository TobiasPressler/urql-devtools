import React, {
  useContext,
  useMemo,
  useCallback,
  useState,
  FC,
  useEffect,
  useRef,
} from "react";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { ExplorerContext } from "../../../context";
import { InlineCodeHighlight, Arrow } from "../../../components";
import { Arguments } from "./Arguments";
import { Tree } from "./Tree";
import {
  listItemKeyVal,
  itemWithChildren,
  itemWithoutChildren,
  outlineContainer,
  flashAnchor,
  flashOverlay,
  name,
  childrenName,
  typename,
} from "./ListItem.css";

/** Empty overlay whose only purpose is to (re)play the flash animation. */
const Flash: FC<{ flashKey: number }> = ({ flashKey }) =>
  flashKey ? <span key={flashKey} className={flashOverlay} /> : null;

interface ListItemProps {
  node: ParsedFieldNode;
  depth?: number;
}

export const ListItem: FC<ListItemProps> = ({ node, depth = 0 }) => {
  const previousNode = useRef(node);
  const [flashKey, setFlashKey] = useState(0);
  const flash = useCallback(() => setFlashKey((k) => k + 1), []);
  const { expandedNodes, setExpandedNodes, setFocusedNode } =
    useContext(ExplorerContext);
  const isExpanded = useMemo(
    () => expandedNodes.some((n) => n._id === node._id),
    [node, expandedNodes],
  );

  useEffect(() => {
    const childrenChanged =
      !isExpanded && previousNode.current.children !== node.children;
    const valueChangedWithoutChildren =
      !previousNode.current.children &&
      previousNode.current.value !== node.value;

    if (childrenChanged || valueChangedWithoutChildren) {
      flash();
    }

    previousNode.current = node;
  }, [isExpanded, flash, node]);

  const handleFieldContainerClick = useCallback(() => {
    if (isExpanded) {
      setExpandedNodes((n) =>
        n.slice(
          0,
          n.findIndex((n) => n._id === node._id),
        ),
      );
      setFocusedNode(undefined);
      return;
    }

    setExpandedNodes((n) => [...n, node]);
    setFocusedNode(node);
  }, [isExpanded, node, setExpandedNodes]);

  if (
    (Array.isArray(node.children) && node.children.length > 0) ||
    node.children
  ) {
    return (
      <li role="treeitem" className={itemWithChildren}>
        <div
          onClick={handleFieldContainerClick}
          aria-expanded={isExpanded}
          className={outlineContainer}
        >
          <Flash flashKey={flashKey} />
          <Arrow data-active={isExpanded} />
          <span className={childrenName}>{node.name}</span>
          <Arguments args={node.args} />
        </div>
        {isExpanded && <Tree nodeMap={node.children} depth={depth + 1} />}
      </li>
    );
  }

  const contents = (
    <div className={listItemKeyVal}>
      <span className={name}>{node.name}</span>
      {": "}
      <span className={flashAnchor}>
        <Flash flashKey={flashKey} />
        <InlineCodeHighlight
          code={JSON.stringify(node.children || node.value) || "undefined"}
          language="javascript"
        />
      </span>
    </div>
  );

  if (node.args) {
    return (
      <li role="treeitem" className={itemWithoutChildren}>
        <div aria-expanded={isExpanded} className={outlineContainer}>
          <Flash flashKey={flashKey} />
          {contents}
        </div>
      </li>
    );
  }
  return (
    <li role="treeitem" className={itemWithoutChildren}>
      {contents}
    </li>
  );
};

export const SystemListItem: React.FC<{
  node: ParsedFieldNode;
  index?: number;
}> = ({ node, index }) => (
  <li className={itemWithoutChildren}>
    <div className={typename}>
      {`${node.value}`}
      {typeof index === "number" ? ` #${index}` : null}
    </div>
  </li>
);
