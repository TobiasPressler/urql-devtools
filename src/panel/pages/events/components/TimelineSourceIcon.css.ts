import { style } from "@vanilla-extract/css";
import {
  colorCanvasElevated05,
  colorCanvasElevated10,
  colorTextBase,
  radiiS,
} from "../../../theme.css";

export const timelineSourceIcon = style({
  borderRadius: radiiS,
  backgroundColor: colorCanvasElevated05,
  color: colorTextBase,
  cursor: "pointer",
  height: "1.25rem",
  lineHeight: "1.25rem",
  textAlign: "center",
  width: "1.25rem",
  transition: "background-color 150ms ease-out",
  selectors: {
    "&:before": {
      content: "attr(data-kind-letter)",
    },
    "&:hover": {
      backgroundColor: colorCanvasElevated10,
    },
  },
});
