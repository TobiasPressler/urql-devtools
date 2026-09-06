import React, {
  FC,
  PropsWithChildren,
  useMemo,
  useState,
  useCallback,
  CSSProperties,
} from "react";
import { DebugEvent } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import ExecutionIcon from "../../../../assets/events/execution.svg";
import OtherIcon from "../../../../assets/events/other.svg";
import TeardownIcon from "../../../../assets/events/teardown.svg";
import UpdateIcon from "../../../../assets/events/update.svg";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";
import { svg, svgContainer, eventPopout } from "./TimelineEvent.css";

const eventGroupIcon: Record<string, FC<React.SVGProps<SVGSVGElement>>> = {
  execution: ExecutionIcon,
  update: UpdateIcon,
  teardown: TeardownIcon,
  other: OtherIcon,
};

export const TimelineEvent: FC<{
  event: DebugEvent;
  style?: CSSProperties;
  onClick?: () => void;
}> = ({ event, style, onClick }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  const iconSize = useMemo(
    () =>
      Object.keys(eventGroupIcon)
        .filter((k) => k !== "other")
        .includes(event.type)
        ? 12
        : 8,
    [event.type],
  );

  const Icon = useMemo(
    () => eventGroupIcon[event.type] || eventGroupIcon.other,
    [],
  );

  return (
    <>
      <Icon
        width={iconSize}
        height={iconSize}
        ref={ref as React.Ref<SVGSVGElement>}
        style={style}
        onClick={onClick}
        className={svg}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};

export const TimelineEventGroup: FC<
  PropsWithChildren<
    React.HTMLAttributes<HTMLSpanElement> & {
      style?: CSSProperties;
      onClick?: () => void;
    }
  >
> = ({ children, ...props }) => {
  const { ref, tooltipProps } = useTooltip();
  const [isExpanded, setExpanded] = useState(false);

  const handleMouseLeave = useCallback(() => setExpanded(false), []);

  return (
    <>
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        {...props}
        className={`${svgContainer} ${props.className || ""}`}
      >
        <FontAwesomeIcon
          icon={faCaretSquareUp}
          onClick={() => setExpanded((e) => !e)}
          style={{ width: 10, height: 10 }}
          className={svg}
        />
      </span>
      {isExpanded && (
        <div
          {...tooltipProps}
          onMouseLeave={handleMouseLeave}
          className={eventPopout}
        >
          {children}
        </div>
      )}
    </>
  );
};
