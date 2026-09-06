import { style } from "@vanilla-extract/css";
import {
  colorTextBase,
  colorTooltipBg,
  fontSizeBodyM,
  lineHeightBodyM,
  radiiS,
  space3,
  space4,
} from "../../../theme.css";

export const tooltipElement = style({
  position: "relative",
  backgroundColor: colorTooltipBg,
  borderRadius: radiiS,
  color: colorTextBase,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  margin: 0,
  padding: `${space3} ${space4}`,
  whiteSpace: "nowrap",
  selectors: {
    "&::after": {
      content: "",
      display: "block",
      position: "absolute",
      borderTop: `9px solid ${colorTooltipBg}`,
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      marginTop: "-1px",
      left: "calc(50% - var(--tooltip-offset, 0px))",
      top: "100%",
      transform: "translate(-50%, 0)",
    },
  },
});
