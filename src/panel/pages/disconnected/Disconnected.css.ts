import { globalStyle, style } from "@vanilla-extract/css";
import {
  colorCanvasBase,
  colorTextBase,
  colorTextDimmedBase,
} from "../../theme.css";

globalStyle("body", {
  margin: 0,
});

export const container = style({
  width: "100%",
  height: "100%",
  background: colorCanvasBase,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const header = style({
  color: colorTextBase,
  fontWeight: 400,
  margin: 0,
});

export const hint = style({
  color: colorTextDimmedBase,
});

export const logo = style({
  width: "9.375rem",
});

globalStyle(`${logo} path`, {
  fill: colorTextBase,
});
