import React, { FC, useMemo } from "react";
import { DebugEvent, Operation } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faStopwatch,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { print } from "graphql";
import { Pane, CodeHighlight } from "../../../../components";
import { useTimelineContext } from "../../../../context";
import {
  container,
  body,
  paneSection,
  getStartedSection,
  icon,
} from "./TimelinePane.css";

export const TimelinePane: FC<
  ({ event: DebugEvent } | { source?: Operation }) &
    React.HTMLAttributes<HTMLDivElement>
> = (allProps) => {
  const { event, source, ...props } = allProps as {
    event?: DebugEvent;
    source?: Operation;
  } & React.HTMLAttributes<HTMLDivElement>;
  const content = useMemo(() => {
    if (source) {
      return (
        <>
          <SourceSection operation={source} />
        </>
      );
    }

    if (event) {
      return (
        <>
          <EventSection event={event} />
          <SourceSection operation={event.operation} />
        </>
      );
    }

    return (
      <div className={getStartedSection}>
        Click around on the timeline to get started...
      </div>
    );
  }, [event, source]);

  return (
    <Pane {...props} className={`${container} ${props.className || ""}`}>
      <Pane.Body className={body}>{content}</Pane.Body>
    </Pane>
  );
};

const EventSection: FC<{ event: DebugEvent & { duration?: number } }> = ({
  event,
}) => {
  const { startTime } = useTimelineContext();

  const timestamp = useMemo(
    () => `${event.timestamp - startTime} ms`,
    [startTime],
  );

  const metadata = useMemo(
    () => event.data && JSONtoJavascriptString(event.data),
    [event.data],
  );

  return (
    <section className={paneSection}>
      <Pane.Header>Event</Pane.Header>
      <Pane.Body>
        <Pane.Item>
          <Pane.ItemTitle>Event</Pane.ItemTitle>
          <p>{event.type}</p>
        </Pane.Item>
        <Pane.Item>
          <Pane.ItemTitle>Message</Pane.ItemTitle>
          <p>
            <FontAwesomeIcon icon={faQuoteLeft} className={icon} />
            {event.message}
          </p>
        </Pane.Item>
        <Pane.Item>
          <Pane.ItemTitle>Timestamp</Pane.ItemTitle>
          <p>
            <FontAwesomeIcon icon={faStopwatch} className={icon} />
            {timestamp}
          </p>
        </Pane.Item>
        {event.duration && (
          <Pane.Item>
            <Pane.ItemTitle>Duration</Pane.ItemTitle>
            <p>
              <FontAwesomeIcon icon={faClock} className={icon} />
              {(event.duration / 1000).toFixed(2)} seconds
            </p>
          </Pane.Item>
        )}
        {event.data && (
          <Pane.Item>
            <Pane.ItemTitle>Metadata</Pane.ItemTitle>
            <CodeHighlight language={"javascript"} code={metadata} />
          </Pane.Item>
        )}
      </Pane.Body>
    </section>
  );
};

const SourceSection: FC<{ operation: Operation }> = ({ operation }) => (
  <section className={paneSection}>
    <Pane.Header>Operation</Pane.Header>
    <Pane.Body>
      <Pane.Item>
        <Pane.ItemTitle>Key</Pane.ItemTitle>
        <p>{operation.key}</p>
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Operation type</Pane.ItemTitle>
        <p>{operation.kind}</p>
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Query</Pane.ItemTitle>
        <CodeHighlight
          language={"graphql"}
          code={removeTrailingNewline(print(operation.query))}
        />
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Variables</Pane.ItemTitle>
        <CodeHighlight
          language={"javascript"}
          code={JSONtoJavascriptString(
            (operation.variables || {}) as Record<string, unknown>,
          )}
        />
      </Pane.Item>
    </Pane.Body>
  </section>
);

const removeTrailingNewline = (s: string) =>
  s.substring(0, s.lastIndexOf("\n"));

const JSONtoJavascriptString = (o: Record<string, unknown>) =>
  JSON.stringify(o, null, 2).replace(/"([^"]+)":/g, "$1:");
