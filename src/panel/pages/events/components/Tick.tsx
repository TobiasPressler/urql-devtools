import React from "react";
import { tick } from "./Tick.css";

export const Tick: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { label: string }
> = ({ label, className, ...props }) => (
  <div {...props} data-label={label} className={`${tick} ${className || ""}`} />
);
