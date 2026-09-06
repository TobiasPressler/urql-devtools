import React, { FC } from "react";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";
import {
  timelineAliveDuration,
  networkDuration,
  networkDurationSelected,
} from "./TimelineDuration.css";

export const TimelineAliveDuration: FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div {...props} className={`${timelineAliveDuration} ${className || ""}`} />
);

type NetworkState = "fetching" | "success" | "error";

export const TimelineNetworkDuration: FC<{
  state: NetworkState;
  isSelected?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ state, isSelected, ...props }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  return (
    <>
      <div
        {...props}
        ref={ref}
        data-state={state}
        className={`${networkDuration}${isSelected ? ` ${networkDurationSelected}` : ""}`}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`Network state: ${state}`}
        </TimelineTooltip>
      )}
    </>
  );
};
