import { style } from "@vanilla-extract/css";
import {
  colorDividerBase,
  colorTextDimmedBase,
  fontSizeBodyM,
  space6,
} from "../../../theme.css";

export const tick = style({
  position: "absolute",
  width: "0.125rem",
  top: space6,
  bottom: 0,
  selectors: {
    "&:before": {
      content: "attr(data-label)",
      fontFamily: "Roboto",
      fontSize: fontSizeBodyM,
      color: colorTextDimmedBase,
      display: "block",
      textAlign: "center",
      width: "6.25rem",
      marginLeft: "-3.125rem",
    },
    "&:after": {
      content: "",
      position: "absolute",
      width: "0.125rem",
      top: "1.5625rem",
      bottom: 0,
      background: colorDividerBase,
      opacity: 0.3,
    },
  },
});
