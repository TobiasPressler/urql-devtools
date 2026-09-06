import { style } from "@vanilla-extract/css";
import {
  colorCanvasBase,
  colorCodeblockBg,
  colorDividerBase,
  colorTextBase,
  fontSizeBodyM,
  lineHeightBodyM,
  space2,
  space3,
} from "../theme.css";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  background: colorCanvasBase,
  borderTop: `solid 1px ${colorDividerBase}`,
  width: "100%",
  height: "25rem",
  selectors: {
    '&[data-portrait="false"]': {
      width: "25rem",
      height: "100%",
      borderTop: "none",
      borderLeft: `solid 1px ${colorDividerBase}`,
    },
  },
});

const edgeWidth = 4;

export const draggingEdge = style({
  position: "absolute",
  zIndex: 3,
  opacity: 0,
  cursor: "ns-resize",
  width: "100%",
  height: `${edgeWidth}px`,
  top: `-${edgeWidth / 2}px`,
  selectors: {
    '&[data-portrait="false"]': {
      width: `${edgeWidth}px`,
      height: "100%",
      marginTop: 0,
      top: 0,
      left: `-${edgeWidth / 2}px`,
      cursor: "ew-resize",
    },
  },
});

export const body = style({
  flex: 1,
  overflow: "auto",
});

export const header = style({
  margin: 0,
  padding: space3,
  background: colorCodeblockBg,
  borderBottom: `solid 1px ${colorDividerBase}`,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  fontWeight: 400,
});

export const item = style({
  padding: space3,
  selectors: {
    "& + &": {
      borderTop: `solid 1px ${colorDividerBase}`,
    },
  },
});

export const itemTitle = style({
  color: colorTextBase,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  fontWeight: "normal",
  marginTop: 0,
  marginBottom: space2,
});
