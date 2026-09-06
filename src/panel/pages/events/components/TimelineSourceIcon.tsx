import React, { CSSProperties } from "react";
import { timelineSourceIcon } from "./TimelineSourceIcon.css";

export const TimelineSourceIcon: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    kind: "query" | "mutation" | "subscription";
    style?: CSSProperties;
  }
> = ({ kind, className, ...props }) => (
  <div
    {...props}
    data-kind={kind}
    data-kind-letter={kind[0].toUpperCase()}
    className={`${timelineSourceIcon} ${className || ""}`}
  />
);
