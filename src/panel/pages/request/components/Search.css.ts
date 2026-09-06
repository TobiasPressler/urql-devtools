import { style } from "@vanilla-extract/css";
import { colorCanvasBase, colorCanvasHover, colorDividerBase, colorPrimaryBase, colorTextBase, colorTextDimmedBase, fontSizeBodyL, fontSizeBodyM, lineHeightBodyL, space3 } from "../../../theme.css";

export const container = style({
  flex: 1,
});

export const icon = style({
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  color: colorTextDimmedBase,
  pointerEvents: "none",
  selectors: {
    "input:focus ~ &": {
      color: colorPrimaryBase,
    },
  },
});

export const inputWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  color: colorTextDimmedBase,
  paddingLeft: space3,
  borderLeft: `1px solid ${colorDividerBase}`,
});

export const input = style({
  flex: 1,
  backgroundColor: "transparent",
  border: "none",
  width: "100%",
  height: "2rem",
  padding: `0 ${space3}`,
  color: colorTextBase,
  fontSize: fontSizeBodyM,
  selectors: {
    "&:focus": {
      outline: "none",
    },
    "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration":
      {
        display: "none",
      },
  },
});

export const list = style({
  position: "absolute",
  right: 0,
  left: "4rem",
  display: "flex",
  width: "15.625rem",
  maxHeight: "25rem",
  marginTop: 0,
  padding: space3,
  listStyle: "none",
  flexDirection: "column",
  backgroundColor: colorCanvasBase,
  border: `1px solid ${colorDividerBase}`,
  zIndex: 2,
  overflow: "auto",
});

export const listItem = style({
  padding: space3,
  selectors: {
    "&:hover": {
      backgroundColor: colorCanvasHover,
    },
  },
});

export const textButton = style({
  display: "inline-block",
  width: "100%",
  background: "transparent",
  outline: "none",
  border: "none",
  cursor: "pointer",
  color: colorTextBase,
  fontSize: "inherit",
  textAlign: "left",
  padding: 0,
  margin: 0,
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
