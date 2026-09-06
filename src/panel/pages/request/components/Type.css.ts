import { style } from "@vanilla-extract/css";
import { colorSyntaxBase } from "../../../theme.css";

export const textButton = style({
  display: "inline-block",
  background: "transparent",
  outline: "none",
  border: "none",
  cursor: "pointer",
  color: colorSyntaxBase,
  fontSize: "inherit",
  textAlign: "left",
  padding: 0,
  margin: 0,
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
