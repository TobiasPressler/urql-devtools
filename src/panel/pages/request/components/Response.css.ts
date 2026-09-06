import { style } from "@vanilla-extract/css";
import { colorDividerBase, colorErrorBase, colorPendingBase, colorSuccessBase, colorTextDimmedBase, fontSizeBodyM, lineHeightBodyM, space3, space6 } from "../../../theme.css";

export const prompt = style({
  padding: space6,
  textAlign: "center",
  color: colorTextDimmedBase,
});

export const status = style({
  color: colorTextDimmedBase,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  display: "flex",
  alignItems: "center",
});

export const icon = style({
  display: "block",
  marginRight: space3,
  width: "0.5625rem",
  height: "0.5625rem",
  boxSizing: "border-box",
  border: "solid 1px",
  borderRadius: "50%",
  selectors: {
    '&[data-state="idle"]': {
      borderColor: colorDividerBase,
    },
    '&[data-state="fetching"]': {
      borderColor: colorPendingBase,
    },
    '&[data-state="success"]': {
      borderColor: colorSuccessBase,
      backgroundColor: colorSuccessBase,
    },
    '&[data-state="error"]': {
      borderColor: colorErrorBase,
      backgroundColor: colorErrorBase,
    },
  },
});
