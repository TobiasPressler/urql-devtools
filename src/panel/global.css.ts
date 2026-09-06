import { globalStyle } from "@vanilla-extract/css";
import {
  space1,
  space3,
  radiiM,
  fontSizeBodyM,
  lineHeightBodyM,
  colorCanvasBase,
  colorCanvasElevated05,
  colorCodeblockBg,
  colorTooltipBg,
  colorTooltipActive,
  colorTextBase,
  colorSyntaxBase,
  colorSyntaxAtom,
  colorSyntaxAttrName,
  colorSyntaxBoolean,
  colorSyntaxBuiltin,
  colorSyntaxClassName,
  colorSyntaxComment,
  colorSyntaxConstant,
  colorSyntaxFunction,
  colorSyntaxKeyword,
  colorSyntaxMeta,
  colorSyntaxNumber,
  colorSyntaxOperator,
  colorSyntaxProperty,
  colorSyntaxPunctuation,
  colorSyntaxString,
  colorSyntaxVariable,
} from "./theme.css";

// Global styles for prism-react-renderer and codemirror

// CodeMirror styles
globalStyle(".CodeMirror, code", {
  fontSize: fontSizeBodyM,
});

globalStyle(".cm-s-default, .CodeMirror-gutters", {
  // CodeMirror's own stylesheet sets `.CodeMirror { background: white }` /
  // `.CodeMirror-gutters { background-color: #f7f7f7 }` at equal specificity;
  // since it's a static import it can land after this in the bundle, so
  // these need !important to reliably win.
  background: `${colorCanvasBase} !important`,
  borderColor: `${colorCanvasBase} !important`,
});

globalStyle(".CodeMirror-cursor", {
  borderColor: `${colorTextBase} !important`,
});

globalStyle(".CodeMirror-hints.default", {
  color: colorTextBase,
  background: colorTooltipBg,
  borderColor: colorTooltipBg,
});

globalStyle(".CodeMirror-hints.default > .CodeMirror-hint", {
  color: colorTextBase,
});

globalStyle(
  ".CodeMirror-hints.default > .CodeMirror-hint.CodeMirror-hint-active",
  {
    background: colorTooltipActive,
  },
);

globalStyle(".CodeMirror-matchingbracket", {
  textDecoration: "underline",
  color: `${colorSyntaxPunctuation} !important`,
});

globalStyle(".CodeMirror-selected", {
  background: `${colorCanvasElevated05} !important`,
});

globalStyle(".CodeMirror-focused .CodeMirror-selected", {
  background: `${colorCodeblockBg} !important`,
});

globalStyle(
  ".CodeMirror-line::selection, .CodeMirror-line>span::selection, .CodeMirror-line>span>span::selection",
  {
    background: `${colorCodeblockBg} !important`,
  },
);

globalStyle(
  ".CodeMirror-line::-moz-selection, .CodeMirror-line>span::-moz-selection, .CodeMirror-line>span>span::-moz-selection",
  {
    background: `${colorCodeblockBg} !important`,
  },
);

// Syntax highlighting — CodeMirror + Prism
// Original nests these under `.cm-s-default, [class*="language-"] { ... }`,
// so every child selector below must be crossed with BOTH parents.
// `.cm-s-default` needs !important: CodeMirror's own stylesheet sets
// `.CodeMirror { color: black }` at equal specificity and (being a static
// import) can land after this rule in the bundle.
globalStyle('.cm-s-default, [class*="language-"]', {
  color: `${colorSyntaxBase} !important`,
});

globalStyle(
  '.cm-s-default .token.comment, .cm-s-default .cm-comment, [class*="language-"] .token.comment, [class*="language-"] .cm-comment',
  {
    // !important: collides with CodeMirror's own baked-in "default theme"
    // rule for the same `.cm-s-default .cm-comment` selector.
    color: `${colorSyntaxComment} !important`,
  },
);

globalStyle(
  '.cm-s-default .token.punctuation, .cm-s-default .cm-punctuation, [class*="language-"] .token.punctuation, [class*="language-"] .cm-punctuation',
  {
    color: colorSyntaxPunctuation,
  },
);

globalStyle(
  '.cm-s-default .token.number, .cm-s-default .cm-number, [class*="language-"] .token.number, [class*="language-"] .cm-number',
  {
    color: `${colorSyntaxNumber} !important`,
  },
);

globalStyle(
  '.cm-s-default .token.string, .cm-s-default .cm-string, .cm-s-default .cm-string-2, [class*="language-"] .token.string, [class*="language-"] .cm-string, [class*="language-"] .cm-string-2',
  {
    color: `${colorSyntaxString} !important`,
  },
);

globalStyle(
  '.cm-s-default .token.operator, [class*="language-"] .token.operator',
  {
    color: colorSyntaxOperator,
  },
);

globalStyle(
  '.cm-s-default .token.keyword, .cm-s-default .cm-keyword, [class*="language-"] .token.keyword, [class*="language-"] .cm-keyword',
  {
    color: `${colorSyntaxKeyword} !important`,
  },
);

globalStyle(
  '.cm-s-default .token.function, [class*="language-"] .token.function',
  {
    color: colorSyntaxFunction,
  },
);

globalStyle(
  '.cm-s-default .token.constant, [class*="language-"] .token.constant',
  {
    color: colorSyntaxConstant,
  },
);

globalStyle(
  '.cm-s-default .token.class-name, .cm-s-default .cm-def, [class*="language-"] .token.class-name, [class*="language-"] .cm-def',
  {
    color: `${colorSyntaxClassName} !important`,
  },
);

globalStyle(
  '.cm-s-default .token.boolean, [class*="language-"] .token.boolean',
  {
    color: colorSyntaxBoolean,
  },
);

globalStyle(
  '.cm-s-default .token.property, .cm-s-default .cm-property, [class*="language-"] .token.property, [class*="language-"] .cm-property',
  {
    color: colorSyntaxProperty,
  },
);

globalStyle(
  '.cm-s-default .token.variable, .cm-s-default .cm-variable, [class*="language-"] .token.variable, [class*="language-"] .cm-variable',
  {
    color: colorSyntaxVariable,
  },
);

globalStyle(
  '.cm-s-default .token.attr-name, .cm-s-default .cm-attribute, [class*="language-"] .token.attr-name, [class*="language-"] .cm-attribute',
  {
    color: `${colorSyntaxAttrName} !important`,
  },
);

globalStyle('.cm-s-default .cm-atom, [class*="language-"] .cm-atom', {
  color: `${colorSyntaxAtom} !important`,
});

globalStyle('.cm-s-default .cm-builtin, [class*="language-"] .cm-builtin', {
  color: `${colorSyntaxBuiltin} !important`,
});

globalStyle('.cm-s-default .cm-meta, [class*="language-"] .cm-meta', {
  color: `${colorSyntaxMeta} !important`,
});

globalStyle(
  '.cm-s-default .cm-invalidchar, [class*="language-"] .cm-invalidchar',
  {
    color: colorSyntaxBase,
  },
);

// Prism code blocks
// Modified version of - https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-dark.css
globalStyle('code[class*="language-"], pre[class*="language-"]', {
  textAlign: "left",
  whiteSpace: "pre",
  wordSpacing: "normal",
  wordBreak: "normal",
  wordWrap: "normal",
  fontFamily: "Roboto Mono, monospace",
  fontSize: fontSizeBodyM,
  lineHeight: "1.5",

  MozTabSize: "4",
  OTabSize: "4",
  tabSize: "4",

  WebkitHyphens: "none",
  MozHyphens: "none",
  msHyphens: "none",
  hyphens: "none",
});

globalStyle(':not(pre) > code[class*="language-"]', {
  whiteSpace: "normal",
  borderRadius: radiiM,
  padding: space1,
});

globalStyle('pre[class*="language-"]', {
  overflow: "auto",
  position: "relative",
  padding: space3,
  marginTop: space3,
  marginBottom: 0,
});

globalStyle("html", {
  scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
  scrollbarWidth: "thin",
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  fontSize: fontSizeBodyM,
  lineHeight: lineHeightBodyM,
});

globalStyle("::-webkit-scrollbar", {
  width: "8px",
  height: "8px",
});

globalStyle("::-webkit-scrollbar-track, ::-webkit-scrollbar-corner", {
  background: "transparent",
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  background: "rgba(255, 255, 255, 0.15)",
});

globalStyle("::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:active", {
  background: "rgba(255, 255, 255, 0.2)",
});
