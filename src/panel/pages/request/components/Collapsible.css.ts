import { style } from "@vanilla-extract/css";
import {
  colorCanvasActive,
  colorCanvasHover,
  colorDividerBase,
  colorTextDimmedBase,
  fontSizeBodyM,
  lineHeightBodyM,
  space2,
} from "../../../theme.css";

export const collapsibleHeader = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  color: colorTextDimmedBase,
  borderTop: `1px solid ${colorDividerBase}`,
  borderBottom: `1px solid ${colorDividerBase}`,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  padding: space2,
  selectors: {
    "&:hover": {
      background: colorCanvasHover,
    },
    "&:focus": {
      background: colorCanvasActive,
      outline: "none",
    },
    "& + &": {
      borderTop: 0,
    },
  },
});
