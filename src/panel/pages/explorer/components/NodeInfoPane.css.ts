import { style } from "@vanilla-extract/css";
import { colorCanvasElevated05, colorTextDimmedBase, space2, space3, space5, space6 } from "../../../theme.css";

export const expandPrompt = style({
  textAlign: "center",
  padding: space5,
  background: colorCanvasElevated05,
  color: colorTextDimmedBase,
  cursor: "pointer",
});

export const name = style({
  color: colorTextDimmedBase,
});

export const description = style({
  color: colorTextDimmedBase,
  marginBottom: 0,
  marginTop: space2,
});

export const textContainer = style({
  padding: space6,
});

export const text = style({
  margin: 0,
  textAlign: "center",
  color: colorTextDimmedBase,
});

export const cacheIcon = style({
  position: "relative",
  top: "0.0625rem",
  marginRight: space3,
});
