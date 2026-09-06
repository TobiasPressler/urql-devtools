import { style } from "@vanilla-extract/css";
import {
  colorDividerBase,
  colorPrimaryActive,
  colorPrimaryBase,
  colorPrimaryHover,
  colorTextDimmedActive,
  colorTextDimmedBase,
  colorTextDimmedHover,
  fontSizeBodyL,
  lineHeightBodyL,
} from "../theme.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: `solid 1px ${colorDividerBase}`,
});

export const item = style({
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  color: colorTextDimmedBase,
  ":hover": {
    color: colorTextDimmedHover,
  },
  ":active": {
    color: colorTextDimmedActive,
  },
  ":disabled": {
    opacity: 0.5,
  },
});

export const itemActive = style([
  item,
  {
    color: colorPrimaryBase,
    ":hover": {
      color: colorPrimaryHover,
    },
    ":active": {
      color: colorPrimaryActive,
    },
  },
]);
