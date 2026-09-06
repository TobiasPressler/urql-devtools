import { style, globalStyle } from "@vanilla-extract/css";
import {
  colorDividerBase,
  colorTextDimmedBase,
  fontSizeBodyL,
  lineHeightBodyL,
  space2,
  space3,
} from "../../../theme.css";

export const list = style({
  margin: 0,
  padding: space3,
  marginLeft: space2,
  borderLeft: `3px solid ${colorDividerBase}`,
  listStyle: "none",
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  color: colorTextDimmedBase,
  selectors: {
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
});

globalStyle(`${list}[role="tree"]`, {
  borderLeft: "none",
});

globalStyle(`${list}[role="tree"] > li`, {
  borderLeft: "none",
  padding: 0,
});
