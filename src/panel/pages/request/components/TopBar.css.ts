import { style } from "@vanilla-extract/css";
import { colorCanvasElevated05, colorPrimaryBase, colorTextDimmedBase, fontSizeBodyS, lineHeightBodyS, space2, space3 } from "../../../theme.css";

export const flexContainer = style({
  backgroundColor: colorCanvasElevated05,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
});

export const textButton = style({
  display: "inline-block",
  background: "transparent",
  outline: "none",
  border: "none",
  cursor: "pointer",
  fontSize: fontSizeBodyS,
  lineHeight: lineHeightBodyS,
  textAlign: "left",
  padding: 0,
  margin: 0,
  color: colorPrimaryBase,
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
    '&[data-disabled="true"]': {
      color: colorTextDimmedBase,
      pointerEvents: "none",
    },
    '&[data-disabled="false"]::after': {
      content: '">"',
      display: "inline-block",
      margin: `0 ${space2}`,
      color: colorTextDimmedBase,
    },
  },
});

export const breadcrumbs = style({
  display: "flex",
  alignItems: "center",
  padding: `${space3} ${space2}`,
  margin: `0 ${space2}`,
  color: colorTextDimmedBase,
});
