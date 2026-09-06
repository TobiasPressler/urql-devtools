import {
  FC,
  useContext,
  useMemo,
  ComponentProps,
  useState,
  useCallback,
  useRef,
} from "react";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { Pane, CodeHighlight } from "../../../components";
import { ExplorerContext } from "../../../context";
import { CacheOutcomeIcon } from "./Icons";
import {
  expandPrompt,
  name,
  description,
  textContainer,
  text,
  cacheIcon,
} from "./NodeInfoPane.css";

export const NodeInfoPane: FC<ComponentProps<typeof Pane>> = (props) => {
  const { focusedNode } = useContext(ExplorerContext);

  const content = useMemo(() => {
    if (!focusedNode) {
      return (
        <div className={textContainer}>
          <p className={text}>Select a node to see more information...</p>
        </div>
      );
    }

    return <NodeInfoContent node={focusedNode} />;
  }, [focusedNode]);

  return (
    <Pane {...props}>
      <Pane.Body>{content}</Pane.Body>
    </Pane>
  );
};

const NodeInfoContent: FC<{ node: ParsedFieldNode }> = ({ node }) => {
  const previousNode = useRef(node);
  const [expanded, setExpanded] = useState(false);

  const value = useMemo(
    () =>
      node.value || node.children
        ? JSON.stringify(node.value || node.children, null, 2)
        : false,
    [node.value, node.children],
  );

  const isExpanded = useMemo(
    () =>
      (value && value.length < 10000) ||
      (expanded && previousNode.current._id == node._id),
    [node._id, expanded, value],
  );

  const handleReveal = useCallback(() => setExpanded(true), []);

  previousNode.current = node;

  return (
    <>
      <Pane.Item>
        <Pane.ItemTitle>Name</Pane.ItemTitle>
        <code className={name}>{node.name}</code>
      </Pane.Item>
      {node.cacheOutcome ? (
        <Pane.Item>
          <Pane.ItemTitle>Cache Outcome</Pane.ItemTitle>
          <CacheOutcomeIcon state={node.cacheOutcome} className={cacheIcon} />
          <code className={name}>{node.cacheOutcome}</code>
          {getDescription(node.cacheOutcome)}
        </Pane.Item>
      ) : null}
      {node.args ? (
        <Pane.Item>
          <Pane.ItemTitle>Arguments</Pane.ItemTitle>
          <CodeHighlight
            code={JSON.stringify(node.args, null, 2)}
            language="javascript"
          />
        </Pane.Item>
      ) : null}
      {value ? (
        <Pane.Item>
          <Pane.ItemTitle>Value</Pane.ItemTitle>
          {isExpanded ? (
            <CodeHighlight code={value} language="javascript" />
          ) : (
            <div
              role={"button"}
              onClick={handleReveal}
              className={expandPrompt}
            >
              Click to expand
            </div>
          )}
        </Pane.Item>
      ) : null}
    </>
  );
};

const getDescription = (status: ParsedFieldNode["cacheOutcome"]) => {
  switch (status) {
    case "hit": {
      return (
        <p className={description}>{"This result was served from cache."}</p>
      );
    }
    case "partial": {
      return (
        <p className={description}>
          {"Some values for this result were served from cache."}
        </p>
      );
    }
    case "miss": {
      return (
        <p className={description}>{"This result wasn't served from cache"}</p>
      );
    }
    default: {
      return null;
    }
  }
};
