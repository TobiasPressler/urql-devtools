import { style } from "@vanilla-extract/css";
import {
  colorCanvasElevated05,
  colorDividerBase,
  colorTextBase,
  colorTextDimmedBase,
  fontSizeBodyM,
  fontSizeBodyS,
  lineHeightBodyM,
  lineHeightBodyS,
  radiiS,
  space1,
  space2,
  space4,
} from "../../../theme.css";

export const listItemKeyVal = style({
  margin: 0,
});

const itemBase = style({
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  color: colorTextDimmedBase,
  selectors: {
    "& + &": {
      marginTop: space2,
    },
  },
});

export const itemWithChildren = style([
  itemBase,
  {
    paddingLeft: 0,
  },
]);

export const itemWithoutChildren = style([
  itemBase,
  {
    paddingLeft: space4,
  },
]);

export const outlineContainer = style({
  cursor: "pointer",
  display: "flex",
  whiteSpace: "nowrap",
  overflow: "hidden",
  alignItems: "baseline",
  width: "100%",
});

export const name = style({
  color: colorTextBase,
});

export const childrenName = style({
  flexShrink: 0,
  marginRight: space2,
  color: colorTextBase,
  fontWeight: "bold",
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
});

export const typename = style({
  display: "inline-block",
  padding: `${space1} ${space2}`,
  border: `1px solid ${colorDividerBase}`,
  borderRadius: radiiS,
  backgroundColor: colorCanvasElevated05,
  color: colorTextBase,
  fontSize: fontSizeBodyS,
  lineHeight: lineHeightBodyS,
});
