import React, { useState, useCallback, FC } from "react";
import {
  faCog,
  faFastBackward,
  faFastForward,
  faSearchPlus,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Collapsible, Toolbar } from "../../../components";
import { useTimelineContext, START_PADDING } from "../../../context";
import {
  container,
  content,
  filterList,
  filterGroup,
  filterButton,
} from "./Settings.css";

export const Settings: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleExpandToggle = useCallback(() => setCollapsed((c) => !c), []);
  const { setPosition, startTime, zoomIn, zoomOut } = useTimelineContext();

  const handleBackClick = useCallback(
    () => setPosition(startTime - START_PADDING),
    [setPosition, startTime]
  );

  const handleForwardClick = useCallback(() => setPosition(Date.now()), [
    setPosition,
    startTime,
  ]);

  return (
    <div {...props} className={`${container} ${props.className || ""}`}>
      <Toolbar
        items={[
          {
            title: "Show filters",
            icon: faCog,
            active: !collapsed,
            onClick: handleExpandToggle,
          },
          {
            title: "Zoom in",
            icon: faSearchPlus,
            onClick: zoomIn,
          },
          {
            title: "Zoom out",
            icon: faSearchMinus,
            onClick: zoomOut,
          },
          {
            title: "Back to start [Home]",
            icon: faFastBackward,
            onClick: handleBackClick,
          },
          {
            title: "Forward to current time [End]",
            icon: faFastForward,
            onClick: handleForwardClick,
          },
        ]}
      />

      <Collapsible collapsed={collapsed} className={content}>
        <Filter />
      </Collapsible>
    </div>
  );
};

export const Filter: FC = () => {
  const { filterables, filter, setFilter } = useTimelineContext();

  const handleSourceToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        source: state.source.includes(v)
          ? state.source.filter((f) => f !== v)
          : [...state.source, v],
      })),
    [setFilter]
  );

  const handleTypeToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        graphqlType: state.graphqlType.includes(v)
          ? state.graphqlType.filter((f) => f !== v)
          : [...state.graphqlType, v],
      })),
    [setFilter]
  );

  return (
    <div className={filterList}>
      <div className={filterGroup}>
        {filterables.graphqlType.map((e) => (
          <button
            key={e}
            title="Toggle Graphql operation type"
            role="checkbox"
            aria-selected={filter.graphqlType.includes(e)}
            onClick={handleTypeToggle(e)}
            className={filterButton}
          >
            {e}
          </button>
        ))}
      </div>
      <div className={filterGroup}>
        {filterables.source.map((e) => (
          <button
            key={e}
            title="Toggle debug event source"
            role="checkbox"
            aria-selected={filter.source.includes(e)}
            onClick={handleSourceToggle(e)}
            className={filterButton}
          >
            {e.replace(/Exchange$/, "")}
          </button>
        ))}
      </div>
    </div>
  );
};
