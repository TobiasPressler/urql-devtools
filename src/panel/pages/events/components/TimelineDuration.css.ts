import { style } from "@vanilla-extract/css";
import {
  colorCanvasElevated05,
  colorDividerBase,
  colorErrorBase,
  colorPendingBase,
  colorSuccessBase,
  space6,
} from "../../../theme.css";

export const timelineAliveDuration = style({
  height: space6,
  background: colorCanvasElevated05,
});

export const networkDuration = style({
  cursor: "pointer",
  height: "0.625rem",
  selectors: {
    '&[data-state="fetching"]': {
      background: colorPendingBase,
    },
    '&[data-state="success"]': {
      background: colorSuccessBase,
    },
    '&[data-state="error"]': {
      background: colorErrorBase,
    },
  },
});

export const networkDurationSelected = style({
  outline: `${colorDividerBase} solid 3px`,
});
