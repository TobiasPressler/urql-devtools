import { style, globalStyle } from "@vanilla-extract/css";
import {
  colorCanvasElevated05,
  colorTextDimmedActive,
  colorTextDimmedBase,
  colorTextDimmedHover,
  space2,
} from "../../../theme.css";

export const svg = style({
  cursor: "pointer",
  filter: "brightness(1)",
  transition: "filter 300ms ease",
});

globalStyle(`${svg} > *`, {
  fill: colorTextDimmedBase,
});

globalStyle(`${svg}:hover > *`, {
  fill: colorTextDimmedHover,
});

globalStyle(`${svg}:active > *`, {
  fill: colorTextDimmedActive,
});

export const svgContainer = style({
  display: "flex",
});

export const eventPopout = style({
  display: "flex",
  alignItems: "center",
  backgroundColor: colorCanvasElevated05,
  padding: space2,
});

globalStyle(`${eventPopout} > * + *`, {
  marginLeft: space2,
});
