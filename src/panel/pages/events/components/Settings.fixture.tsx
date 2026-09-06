import React, { useState, useMemo, PropsWithChildren, FC } from "react";
import { TimelineContext } from "../../../context/Timeline";
import { Settings, Filter } from "./Settings";

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ padding: 20 }}>{children}</div>
);

const MockTimelineProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState({
    source: ["devtoolsExchange"],
    graphqlType: ["query", "mutation", "subscription"],
  });

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      filterables: {
        source: ["devtoolsExchange", "fetchExchange", "graphCacheExchange"],
        graphqlType: ["query", "mutation", "subscription"],
      },
    }),
    [filter],
  );

  return (
    <TimelineContext.Provider value={value as any}>
      {children}
    </TimelineContext.Provider>
  );
};

export default {
  settings: (
    <Wrapper>
      <MockTimelineProvider>
        <Settings data-snapshot />
      </MockTimelineProvider>
    </Wrapper>
  ),
  filter: (
    <Wrapper>
      <MockTimelineProvider>
        <Filter data-snapshot />
      </MockTimelineProvider>
    </Wrapper>
  ),
};
