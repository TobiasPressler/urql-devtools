import { keyframes, style } from "@vanilla-extract/css";
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
  position: "relative",
  cursor: "pointer",
  display: "flex",
  whiteSpace: "nowrap",
  overflow: "hidden",
  alignItems: "baseline",
  width: "100%",
});

export const flashAnchor = style({
  position: "relative",
  display: "inline-block",
});

const flashKeyframes = keyframes({
  "0%": { backgroundColor: "rgba(255, 255, 255, 0)" },
  "50%": { backgroundColor: "rgba(255, 255, 255, 1)" },
  "100%": { backgroundColor: "rgba(255, 255, 255, 0)" },
});

// Rendered as an empty, absolutely-positioned overlay sibling rather than
// applied directly to the content container: retriggering the animation
// (see ListItem.tsx) works by remounting via a changing `key`, and this
// element has no children of its own, so remounting it can't disturb any
// child element's own CSS transitions (e.g. the expand arrow's rotation).
export const flashOverlay = style({
  position: "absolute",
  inset: 0,
  // A positioned element stacks above its static in-flow siblings
  // regardless of DOM order, so without this the flash would paint over
  // the content instead of sitting behind it as a background wash.
  zIndex: -1,
  pointerEvents: "none",
  animationName: flashKeyframes,
  animationDuration: "600ms",
  animationTimingFunction: "ease-out",
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
