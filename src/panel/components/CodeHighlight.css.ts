import { style, globalStyle } from "@vanilla-extract/css";
import { colorCanvasElevated05, colorCanvasElevated10, colorCodeblockBg, colorTextBase, fontSizeBodyM, radiiM, space2, space3 } from "../theme.css";

export const styledInlineBlock = style({
  display: "inline-flex",
  margin: "0 !important",
  padding: "0 !important",
  backgroundColor: "none !important",
  background: "none !important",
});

globalStyle(`${styledInlineBlock} > code > div`, {
  textOverflow: "ellipsis",
  overflow: "hidden",
});

export const styledCodeBlock = style({
  background: `${colorCodeblockBg} !important`,
  fontSize: `${fontSizeBodyM} !important`,
});

export const copyButton = style({
  background: colorCanvasElevated05,
  color: colorTextBase,
  padding: space3,
  borderRadius: radiiM,
  position: "absolute",
  top: space2,
  right: space2,
  selectors: {
    "&:hover": {
      background: `${colorCanvasElevated10} !important`,
    },
  },
});

export const div = style({
  position: "relative",
  maxWidth: "100%",
});
