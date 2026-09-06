import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { colorCanvasActive, colorCanvasBase, colorCanvasHover, colorDividerBase, colorPrimaryBase, colorTextBase, colorTextDimmedBase, fontSizeBodyM, space3 } from "../theme.css";

export const container = style({
  position: "fixed",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  borderBottom: `solid 1px ${colorDividerBase}`,
  background: colorCanvasBase,
  height: "2.25rem",
  top: 0,
  left: 0,
  right: 0,
});

const itemBase = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "100%",
  padding: `0 ${space3}`,
  fontSize: fontSizeBodyM,
  fontWeight: 400,
  textDecoration: "none",
  color: colorTextBase,
  selectors: {
    "&:hover": {
      background: colorCanvasHover,
    },
    "&:active": {
      background: colorCanvasActive,
    },
    "&.active::after": {
      content: "",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -1,
      height: "2px",
      background: colorPrimaryBase,
    },
  },
});

export const item = styleVariants({
  default: [itemBase],
  alignRight: [
    itemBase,
    {
      marginLeft: "auto",
    },
  ],
});

export const logo = style({
  width: "2rem",
  height: "1.1875rem",
});

globalStyle(`${logo} path`, {
  fill: colorTextDimmedBase,
});
