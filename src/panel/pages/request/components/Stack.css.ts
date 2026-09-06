import { style } from "@vanilla-extract/css";
import {
  colorSyntaxBase,
  colorSyntaxEnum,
  colorSyntaxInput,
  colorSyntaxInterface,
  colorSyntaxScalar,
  colorSyntaxType,
  colorSyntaxUnion,
  colorTextBase,
  colorTextDimmedBase,
  fontSizeBodyL,
  lineHeightBodyL,
  space2,
  space3,
} from "../../../theme.css";

export const stackWrapper = style({
  boxSizing: "border-box",
  position: "absolute",
  right: 0,
  top: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const box = style({
  display: "flex",
  flexDirection: "column",
});

export const typeKind = style({
  color: colorSyntaxBase,
  marginRight: space2,
  selectors: {
    '&[data-kind="interface"]': {
      color: colorSyntaxInterface,
    },
    '&[data-kind="enum"]': {
      color: colorSyntaxEnum,
    },
    '&[data-kind="union"]': {
      color: colorSyntaxUnion,
    },
    '&[data-kind="scalar"]': {
      color: colorSyntaxScalar,
    },
    '&[data-kind="input"]': {
      color: colorSyntaxInput,
    },
    '&[data-kind="type"]': {
      color: colorSyntaxType,
    },
  },
});

export const description = style({
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  color: colorTextDimmedBase,
  padding: space3,
  margin: 0,
});

export const typeNameWrapper = style({
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  color: colorTextBase,
  padding: space3,
});
