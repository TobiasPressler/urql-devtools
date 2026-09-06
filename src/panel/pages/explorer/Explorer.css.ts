import { style } from "@vanilla-extract/css";
import {
  colorCanvasBase,
  colorTextBase,
  colorTextDimmedBase,
  fontSizeBodyXl,
  lineHeightBodyXl,
  space3,
  space6,
} from "../../theme.css";

export const container = style({
  background: colorCanvasBase,
});

export const listContainer = style({
  flex: 2,
  flexBasis: "70%",
  overflow: "auto",
});

export const titleWrapper = style({
  padding: space6,
  color: colorTextDimmedBase,
  fontWeight: "normal",
});

export const title = style({
  fontWeight: "normal",
  fontSize: fontSizeBodyXl,
  lineHeight: lineHeightBodyXl,
  color: colorTextBase,
  margin: 0,
});

export const description = style({
  marginTop: space3,
});
