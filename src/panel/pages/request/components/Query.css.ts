import { style } from "@vanilla-extract/css";
import { space2 } from "../../../theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  paddingTop: space2,
});
