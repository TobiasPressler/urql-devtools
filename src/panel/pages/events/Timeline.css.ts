import { style, globalStyle } from "@vanilla-extract/css";
import { colorCanvasBase, space10, space5 } from "../../theme.css";

export const page = style({
  background: colorCanvasBase,
  "@media": {
    "(min-aspect-ratio: 1/1)": {
      flexDirection: "column",
    },
  },
});

export const pageContent = style({
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "@media": {
    "(min-aspect-ratio: 1/1)": {
      flexDirection: "row",
    },
  },
});

export const timelineContainer = style({
  display: "flex",
  flexGrow: 1,
  overflowY: "scroll",
  overflowX: "hidden",
});

export const timelineIcons = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "2.5rem",
  marginTop: space10,
  height: "max-content",
  background: colorCanvasBase,
  zIndex: 1,
});

globalStyle(`${timelineIcons} > *`, {
  marginTop: space5,
});

globalStyle(`${timelineIcons} > *:after`, {
  content: "",
  width: "12.5rem",
  height: "12.5rem",
});

export const timelineList = style({
  cursor: "grab",
  display: "block",
  position: "relative",
  padding: `${space10} 0`,
  overflowY: "visible",
  width: "100%",
  boxSizing: "border-box",
  minHeight: "100%",
  height: "max-content",
  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});
