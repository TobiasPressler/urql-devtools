import { style } from "@vanilla-extract/css";
import { colorTextBase, colorTextDimmedBase, colorTextDimmedHover, fontSizeBodyM, lineHeightBodyM, space3 } from "../theme.css";

export const container = style({
  display: "flex",
});

export const tab = style({
  margin: 0,
  padding: space3,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  color: colorTextDimmedBase,
  selectors: {
    '&[data-active="true"]': {
      color: colorTextBase,
    },
    "&:hover": {
      color: colorTextDimmedHover,
      cursor: "pointer",
    },
  },
});
