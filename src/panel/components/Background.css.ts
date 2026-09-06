import { style } from "@vanilla-extract/css";
import { colorCanvasBase } from "../theme.css";

export const background = style({
  overflow: "hidden",
  position: "fixed",
  backgroundColor: colorCanvasBase,
  top: "2.25rem",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  "@media": {
    "(min-aspect-ratio: 1/1)": {
      flexDirection: "row",
    },
  },
});
