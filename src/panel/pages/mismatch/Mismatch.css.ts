import { style } from "@vanilla-extract/css";
import { colorCanvasBase, colorErrorBase, colorTextBase, colorTextDimmedBase, fontSizeDisplayL, space3, space6, space9 } from "../../theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "18.75rem",
  margin: space3,
  "@media": {
    "(min-width: 768px)": {
      margin: space6,
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

export const icon = style({
  fontSize: fontSizeDisplayL,
  marginBottom: space9,
  color: colorErrorBase,
});

export const code = style({
  width: "100%",
  boxSizing: "border-box",
});
