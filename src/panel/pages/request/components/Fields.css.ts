import { style, globalStyle } from "@vanilla-extract/css";
import { colorSyntaxDescription, colorSyntaxInvalid, colorSyntaxProperty, colorSyntaxString, colorTextBase, fontSizeBodyL, lineHeightBodyL, space2, space3 } from "../../../theme.css";

export const description = style({
  color: colorSyntaxString,
});

export const fieldWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "baseline",
  fontSize: fontSizeBodyL,
  lineHeight: lineHeightBodyL,
  padding: space3,
  color: colorTextBase,
  whiteSpace: "nowrap",
  selectors: {
    "&:last-child": {
      border: "none",
    },
    "& + &": {
      paddingTop: 0,
    },
    '&[data-multiline="true"]': {
      flexDirection: "column",
    },
  },
});

globalStyle(`${fieldWrapper}[data-multiline="true"] > [data-css-description]`, {
  marginBottom: space2,
});

export const separator = style({
  selectors: {
    "&::before": {
      content: "attr(data-content)",
      display: "inline-block",
      color: colorTextBase,
      marginRight: space2,
    },
  },
});

export const name = style({
  color: colorSyntaxProperty,
});

export const deprecated = style({
  display: "inline-block",
  color: colorSyntaxInvalid,
  marginLeft: space2,
});

export const defaultVal = style({
  display: "inline-block",
  color: colorSyntaxDescription,
  marginLeft: space2,
});

export const argWrapper = style({
  display: "flex",
  selectors: {
    '&[data-multiline="true"]': {
      flexDirection: "column",
    },
  },
});

globalStyle(`${argWrapper}[data-multiline="true"] > code`, {
  paddingLeft: space3,
});
