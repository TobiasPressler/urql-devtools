import { style } from "@vanilla-extract/css";
import { colorTextBase, space2 } from "../theme.css";

export const arrow = style({
  flexShrink: 0,
  width: "0.625rem",
  height: "0.625rem",
  marginRight: space2,
  color: colorTextBase,
  transform: "rotate(0deg)",
  transition: "transform 100ms ease",
  selectors: {
    '&[data-active="true"]': {
      transform: "rotate(90deg)",
    },
  },
});
