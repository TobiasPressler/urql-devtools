import {
  FC,
  useMemo,
  useState,
  useCallback,
  useEffect,
  CSSProperties,
} from "react";
import { Operation } from "@urql/core";
import { useTimelineContext, START_PADDING } from "../../context";
import { Background } from "../../components/Background";
import {
  TimelineRow,
  TimelinePane,
  Tick,
  TimelineSourceIcon,
  Settings,
} from "./components";
import {
  page,
  pageContent,
  timelineContainer,
  timelineIcons,
  timelineList,
} from "./Timeline.css";

interface TimelineProps {
  className?: string;
  style?: CSSProperties;
}

export const Timeline: FC<TimelineProps> = (props) => {
  const {
    setContainer,
    scale,
    events,
    eventOrder,
    startTime,
    container,
    selectedEvent,
    setSelectedEvent,
    setPosition,
    filter,
  } = useTimelineContext();
  const [selectedSource, setSelectedSource] = useState<Operation | undefined>();

  useEffect(() => {
    if (selectedEvent) {
      setSelectedSource(undefined);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedSource) {
      setSelectedEvent(undefined);
    }
  }, [selectedSource]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Home") {
        setPosition(startTime - START_PADDING);
      }
      if (e.key === "End") {
        setPosition(Date.now());
      }
    };

    addEventListener("keydown", handleKeyDown, { passive: true });
    return () => removeEventListener("keydown", handleKeyDown);
  }, [setPosition, startTime]);

  const ticks = useMemo(
    () =>
      scale
        ? scale.ticks(getTickCount(container.clientWidth)).map((t) => {
            const delta = t - startTime;
            const time = Math.round(delta / 1000) * 1000;
            return {
              label: `${time}ms`,
              position: scale(time + startTime),
            };
          })
        : [],
    [scale],
  );

  const handleSourceClick = useCallback(
    (o: Operation) => () => {
      setSelectedSource((current) =>
        current && current.key === o.key ? undefined : o,
      );
      const latest = [...events[o.key]]
        .reverse()
        .find((e) => e.type === "execution");
      if (latest) setPosition(latest.timestamp - START_PADDING);
    },
    [events, setPosition, setSelectedSource],
  );

  const sources = useMemo<Operation[]>(
    () =>
      eventOrder.map((key) => {
        const source = events[key].find((e) => e.operation.kind !== "teardown");
        if (source === undefined) {
          return events[key][0].operation;
        }
        return source.operation;
      }),
    [events, eventOrder],
  );

  const paneProps = useMemo(() => {
    if (selectedSource) {
      return { source: selectedSource };
    }
    if (selectedEvent) {
      return { event: selectedEvent };
    }
    return {};
  }, [selectedSource, selectedEvent]);

  const content = useMemo(
    () =>
      !container ? null : (
        <>
          {ticks.map((t, i) => (
            <Tick key={`p-${i}`} label={t.label} style={{ left: t.position }} />
          ))}
          {eventOrder.map((key, i) => (
            <TimelineRow
              key={key}
              events={events[key]}
              style={{
                display: filter.graphqlType.includes(sources[i].kind)
                  ? undefined
                  : "none",
              }}
            />
          ))}
        </>
      ),
    [container, events, eventOrder, ticks, sources],
  );

  return (
    <Background {...props} className={`${page} ${props.className || ""}`}>
      <Settings />
      <div className={pageContent}>
        <div className={timelineContainer}>
          <div className={timelineIcons}>
            {sources.map((s) => (
              <TimelineSourceIcon
                key={s.key}
                title="Source operation"
                kind={s.kind === "teardown" ? "query" : s.kind}
                onClick={handleSourceClick(s)}
                style={{
                  display: filter.graphqlType.includes(s.kind)
                    ? undefined
                    : "none",
                }}
              />
            ))}
          </div>
          <div
            ref={setContainer}
            draggable="true"
            key="TimelineList"
            className={timelineList}
          >
            {content}
          </div>
        </div>
        <TimelinePane {...paneProps} />
      </div>
    </Background>
  );
};

const getTickCount = (width: number) => {
  if (width < 600) {
    return 2;
  }
  if (width < 1300) {
    return 5;
  }
  return 10;
};
