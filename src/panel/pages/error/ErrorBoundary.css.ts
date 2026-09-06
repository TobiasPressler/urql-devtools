import { style } from "@vanilla-extract/css";
import {
  colorCanvasBase,
  colorErrorBase,
  colorPrimaryActive,
  colorPrimaryBase,
  colorPrimaryContrast,
  colorPrimaryHover,
  colorTextBase,
  colorTextDimmedBase,
  fontSizeDisplayM,
  radiiM,
  space2,
  space3,
  space5,
  space6,
  space8,
} from "../../theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "100%",
  width: "25rem",
  margin: space6,
  "@media": {
    "(min-width: 768px)": {
      margin: "0.375rem",
    },
  },
});

export const container = style({
  width: "100%",
  height: "100%",
  background: colorCanvasBase,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto",
  "@media": {
    "(min-width: 768px)": {
      flexDirection: "row",
    },
  },
});

export const header = style({
  color: colorTextBase,
  fontWeight: 400,
  margin: 0,
});

export const hint = style({
  textAlign: "center",
  color: colorTextDimmedBase,
});

export const bugIcon = style({
  fontSize: fontSizeDisplayM,
  marginBottom: space8,
  color: colorErrorBase,
});

export const code = style({
  maxWidth: "100%",
  boxSizing: "border-box",
  color: colorErrorBase,
});

export const button = style({
  margin: space2,
  padding: `${space3} ${space5}`,
  borderRadius: radiiM,
  cursor: "pointer",
  outline: "none",
  color: colorPrimaryContrast,
  background: colorPrimaryBase,
  selectors: {
    '&[data-type="icon"]': {
      padding: `${space3} ${space5}`,
    },
    "&:hover": {
      background: colorPrimaryHover,
    },
    "&:active": {
      background: colorPrimaryActive,
    },
  },
});

export const buttonArray = style({
  display: "flex",
});
