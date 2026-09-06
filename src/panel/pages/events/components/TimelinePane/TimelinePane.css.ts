import { style, globalStyle } from "@vanilla-extract/css";
import {
  colorCanvasBase,
  colorDividerBase,
  colorTextDimmedBase,
  fontSizeBodyM,
  lineHeightBodyM,
  space2,
  space6,
} from "../../../../theme.css";

export const container = style({
  backgroundColor: `${colorCanvasBase}`,
});

export const body = style({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  "@media": {
    "(min-aspect-ratio: 1/1)": {
      flexDirection: "column",
    },
  },
});

export const paneSection = style({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  color: `${colorTextDimmedBase}`,
  boxSizing: "border-box",
  background: `${colorCanvasBase}`,
  "@media": {
    "(max-aspect-ratio: 1/1)": {
      flexBasis: "50%",
      flexGrow: 1,
      selectors: {
        "& + &": {
          maxHeight: "100%",
          minWidth: "50%",
          borderLeft: `solid 1px ${colorDividerBase}`,
        },
      },
    },
    "(min-aspect-ratio: 1/1)": {
      selectors: {
        "&:only-child": {
          flexGrow: 1,
        },
        "&:first-child:not(:only-child)": {
          maxHeight: "50%",
          height: "min-content",
        },
        "& + &": {
          flexGrow: 1,
          flexBasis: 0,
          borderTop: `solid 1px ${colorDividerBase}`,
        },
      },
    },
  },
});

globalStyle(`${paneSection} p`, {
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  margin: 0,
});

export const getStartedSection = style([
  paneSection,
  {
    flexGrow: 1,
    padding: space6,
    textAlign: "center",
    color: colorTextDimmedBase,
  },
]);

export const icon = style({
  marginRight: space2,
});
