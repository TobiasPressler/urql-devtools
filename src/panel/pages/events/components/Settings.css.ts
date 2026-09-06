import { style } from "@vanilla-extract/css";
import { colorCanvasActive, colorCanvasElevated05, colorCanvasHover, colorDividerBase, colorPrimaryActive, colorPrimaryBase, colorPrimaryContrast, colorPrimaryHover, colorTextBase, fontSizeBodyM, radiiS, space2, space3 } from "../../../theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
  transition: "max-height 300ms ease",
});

export const filterList = style({
  display: "flex",
  alignItems: "center",
  borderBottom: `solid 1px ${colorDividerBase}`,
});

export const filterGroup = style({
  margin: `${space2} 0`,
  padding: `0 ${space2}`,
  display: "flex",
  alignItems: "center",
  selectors: {
    "& + &": {
      borderLeft: `solid 1px ${colorDividerBase}`,
    },
  },
});

export const filterButton = style({
  padding: `${space2} ${space3}`,
  border: "none",
  fontSize: fontSizeBodyM,
  fontWeight: 500,
  margin: `0 ${space2}`,
  borderRadius: radiiS,
  cursor: "pointer",
  outline: "none",
  background: colorCanvasElevated05,
  color: colorTextBase,
  selectors: {
    "&:hover": {
      background: colorCanvasHover,
    },
    "&:active": {
      background: colorCanvasActive,
    },
    '&[aria-selected="true"]': {
      background: colorPrimaryBase,
      color: colorPrimaryContrast,
    },
    '&[aria-selected="true"]:hover': {
      background: colorPrimaryHover,
    },
    '&[aria-selected="true"]:active': {
      background: colorPrimaryActive,
    },
  },
});
