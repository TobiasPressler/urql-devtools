import React from "react";
import { background } from "./Background.css";

export const Background: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => <div {...props} className={`${background} ${props.className || ""}`} />;
