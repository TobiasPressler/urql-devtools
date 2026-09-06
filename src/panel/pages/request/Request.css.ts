import { style, globalStyle } from "@vanilla-extract/css";
import { colorCanvasBase, colorDividerBase, colorTextBase, fontSizeBodyM, lineHeightBodyM, space1, space3, space6, space8 } from "../../theme.css";

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

globalStyle(`${pageContent} .CodeMirror`, {
  fontSize: fontSizeBodyM,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

export const paneSection = style({
  color: colorTextBase,
  background: colorCanvasBase,
  overflow: "auto",
  flexGrow: 1,
  flexBasis: 0,
});

globalStyle(`${paneSection} h1`, {
  backgroundColor: colorTextBase,
  position: "sticky",
  top: `calc(-1 * ${space6})`,
  margin: `calc(-1 * ${space6})`,
  padding: `${space1} ${space3}`,
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
  fontWeight: 400,
  borderBottom: `solid 1px ${colorDividerBase}`,
  zIndex: 1,
});

globalStyle(`${paneSection} h1 + *`, {
  marginTop: space8,
});

export const schemaContainer = style({});

globalStyle(`${schemaContainer} > div`, {
  minWidth: "100%",
  width: "100%",
});
