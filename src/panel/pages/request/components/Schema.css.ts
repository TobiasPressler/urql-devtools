import { style } from "@vanilla-extract/css";
import { colorTextBase, colorTextDimmedBase, fontSizeBodyM, lineHeightBodyM, space3 } from "../../../theme.css";

export const flexContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "hidden",
});

export const container = style({
  flex: 1,
  overflow: "auto",
  position: "relative",
});

export const title = style({
  color: colorTextBase,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  fontWeight: "normal",
  marginTop: 0,
  marginBottom: "0.5rem",
  padding: space3,
});

export const wrapper = style({
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  color: colorTextDimmedBase,
});
