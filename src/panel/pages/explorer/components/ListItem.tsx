import React, {
  useContext,
  useMemo,
  useCallback,
  FC,
  useEffect,
  useRef,
} from "react";
import { animated } from "react-spring";

const AnimatedSpan = animated.span as any;
const AnimatedDiv = animated.div as any;
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { ExplorerContext } from "../../../context";
import { useFlash } from "../hooks";
import { InlineCodeHighlight, Arrow } from "../../../components";
import { Arguments } from "./Arguments";
import { Tree } from "./Tree";
import {
  listItemKeyVal,
  itemWithChildren,
  itemWithoutChildren,
  outlineContainer,
  name,
  childrenName,
  typename,
} from "./ListItem.css";

interface ListItemProps {
  node: ParsedFieldNode;
  depth?: number;
}

export const ListItem: FC<ListItemProps> = ({ node, depth = 0 }) => {
  const previousNode = useRef(node);
  const [flashStyle, flash] = useFlash();
  const { expandedNodes, setExpandedNodes, setFocusedNode } = useContext(
    ExplorerContext
  );
  const isExpanded = useMemo(
    () => expandedNodes.some((n) => n._id === node._id),
    [node, expandedNodes]
  );

  useEffect(() => {
    if (!isExpanded && previousNode.current.children !== node.children) {
      flash();
    }

    if (
      !previousNode.current.children &&
      previousNode.current.value !== node.value
    ) {
      flash();
    }

    previousNode.current = node;
  }, [isExpanded, flash, node]);

  const handleFieldContainerClick = useCallback(() => {
    if (isExpanded) {
      setExpandedNodes((n) =>
        n.slice(
          0,
          n.findIndex((n) => n._id === node._id)
        )
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
        <AnimatedDiv
          onClick={handleFieldContainerClick}
          style={flashStyle}
          aria-expanded={isExpanded}
          className={outlineContainer}
        >
          <Arrow data-active={isExpanded} />
          <span className={childrenName}>{node.name}</span>
          <Arguments args={node.args} />
        </AnimatedDiv>
        {isExpanded && <Tree nodeMap={node.children} depth={depth + 1} />}
      </li>
    );
  }

  const contents = (
    <div className={listItemKeyVal}>
      <span className={name}>{node.name}</span>
      {": "}
      <AnimatedSpan style={flashStyle}>
        <InlineCodeHighlight
          code={JSON.stringify(node.children || node.value) || "undefined"}
          language="javascript"
        />
      </AnimatedSpan>
    </div>
  );

  if (node.args) {
    return (
      <li role="treeitem" className={itemWithoutChildren}>
        <AnimatedDiv style={flashStyle} aria-expanded={isExpanded} className={outlineContainer}>
          {contents}
        </AnimatedDiv>
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
