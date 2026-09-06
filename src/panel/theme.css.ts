import { createVar, style } from "@vanilla-extract/css";

// Space
export const space0 = createVar();
export const space1 = createVar();
export const space2 = createVar();
export const space3 = createVar();
export const space4 = createVar();
export const space5 = createVar();
export const space6 = createVar();
export const space7 = createVar();
export const space8 = createVar();
export const space9 = createVar();
export const space10 = createVar();

// Radii
export const radiiS = createVar();
export const radiiM = createVar();
export const radiiRound = createVar();

// Font sizes
export const fontSizeBodyS = createVar();
export const fontSizeBodyM = createVar();
export const fontSizeBodyL = createVar();
export const fontSizeBodyXl = createVar();
export const fontSizeDisplayS = createVar();
export const fontSizeDisplayM = createVar();
export const fontSizeDisplayL = createVar();

// Line heights
export const lineHeightBodyS = createVar();
export const lineHeightBodyM = createVar();
export const lineHeightBodyL = createVar();
export const lineHeightBodyXl = createVar();
export const lineHeightDisplayS = createVar();
export const lineHeightDisplayM = createVar();
export const lineHeightDisplayL = createVar();

// Colors — canvas
export const colorCanvasBase = createVar();
export const colorCanvasHover = createVar();
export const colorCanvasActive = createVar();
export const colorCanvasElevated05 = createVar();
export const colorCanvasElevated10 = createVar();
// Colors — codeblock
export const colorCodeblockBg = createVar();
// Colors — tooltip
export const colorTooltipBg = createVar();
export const colorTooltipActive = createVar();
// Colors — text
export const colorTextBase = createVar();
export const colorTextDimmedBase = createVar();
export const colorTextDimmedHover = createVar();
export const colorTextDimmedActive = createVar();
// Colors — divider
export const colorDividerBase = createVar();
// Colors — primary
export const colorPrimaryBase = createVar();
export const colorPrimaryHover = createVar();
export const colorPrimaryActive = createVar();
export const colorPrimaryContrast = createVar();
// Colors — semantic
export const colorSecondaryBase = createVar();
export const colorSuccessBase = createVar();
export const colorErrorBase = createVar();
export const colorPendingBase = createVar();
// Colors — syntax
export const colorSyntaxBase = createVar();
export const colorSyntaxAtom = createVar();
export const colorSyntaxAttrName = createVar();
export const colorSyntaxBoolean = createVar();
export const colorSyntaxBuiltin = createVar();
export const colorSyntaxClassName = createVar();
export const colorSyntaxComment = createVar();
export const colorSyntaxConstant = createVar();
export const colorSyntaxDescription = createVar();
export const colorSyntaxFunction = createVar();
export const colorSyntaxInvalid = createVar();
export const colorSyntaxKeyword = createVar();
export const colorSyntaxMeta = createVar();
export const colorSyntaxNull = createVar();
export const colorSyntaxNumber = createVar();
export const colorSyntaxOperator = createVar();
export const colorSyntaxProperty = createVar();
export const colorSyntaxPunctuation = createVar();
export const colorSyntaxString = createVar();
export const colorSyntaxVariable = createVar();
export const colorSyntaxInterface = createVar();
export const colorSyntaxEnum = createVar();
export const colorSyntaxUnion = createVar();
export const colorSyntaxScalar = createVar();
export const colorSyntaxInput = createVar();
export const colorSyntaxType = createVar();

// Theme values

// Light theme
const lightVars: Record<string, string> = {
  [space0]: "0",
  [space1]: "0.125rem",
  [space2]: "0.25rem",
  [space3]: "0.5rem",
  [space4]: "0.75rem",
  [space5]: "1rem",
  [space6]: "1.25rem",
  [space7]: "1.5rem",
  [space8]: "2rem",
  [space9]: "3rem",
  [space10]: "4rem",
  [radiiS]: "0.125rem",
  [radiiM]: "0.25rem",
  [radiiRound]: "50%",
  [fontSizeBodyS]: "0.6875rem",
  [fontSizeBodyM]: "0.75rem",
  [fontSizeBodyL]: "0.8125rem",
  [fontSizeBodyXl]: "1rem",
  [fontSizeDisplayS]: "2.5rem",
  [fontSizeDisplayM]: "3.75rem",
  [fontSizeDisplayL]: "5rem",
  [lineHeightBodyS]: "0.875rem",
  [lineHeightBodyM]: "0.9375rem",
  [lineHeightBodyL]: "1rem",
  [lineHeightBodyXl]: "1.25rem",
  [lineHeightDisplayS]: "3rem",
  [lineHeightDisplayM]: "4.5rem",
  [lineHeightDisplayL]: "6rem",
  [colorCanvasBase]: "#fff",
  [colorCanvasHover]: "#e8e0f7",
  [colorCanvasActive]: "#d4c6f0",
  [colorCanvasElevated05]: "#f2f2f2",
  [colorCanvasElevated10]: "#e6e6e6",
  [colorCodeblockBg]: "#f2f2f2",
  [colorTooltipBg]: "#e6e6e6",
  [colorTooltipActive]: "#cccccc",
  [colorTextBase]: "#1d1d1d",
  [colorTextDimmedBase]: "#737373",
  [colorTextDimmedHover]: "#8c8c8c",
  [colorTextDimmedActive]: "#a6a6a6",
  [colorDividerBase]: "#e6e6e6",
  [colorPrimaryBase]: "#7776D2",
  [colorPrimaryHover]: "#6a69c7",
  [colorPrimaryActive]: "#5d5cbd",
  [colorPrimaryContrast]: "#fff",
  [colorSecondaryBase]: "#EB9028",
  [colorSuccessBase]: "#2DAF7E",
  [colorErrorBase]: "#F65151",
  [colorPendingBase]: "#00A1FF",
  [colorSyntaxBase]: "#b35900",
  [colorSyntaxAtom]: "#333333",
  [colorSyntaxAttrName]: "#b35900",
  [colorSyntaxBoolean]: "#5952b3",
  [colorSyntaxBuiltin]: "#5952b3",
  [colorSyntaxClassName]: "#2d8a7a",
  [colorSyntaxComment]: "#2d8a4a",
  [colorSyntaxConstant]: "#b35900",
  [colorSyntaxDescription]: "#666666",
  [colorSyntaxFunction]: "#333333",
  [colorSyntaxInvalid]: "#F65151",
  [colorSyntaxKeyword]: "#5952b3",
  [colorSyntaxMeta]: "#737373",
  [colorSyntaxNull]: "#737373",
  [colorSyntaxNumber]: "#2d8a4a",
  [colorSyntaxOperator]: "#333333",
  [colorSyntaxProperty]: "#b35900",
  [colorSyntaxPunctuation]: "#333333",
  [colorSyntaxString]: "#c2410c",
  [colorSyntaxVariable]: "#b35900",
  [colorSyntaxInterface]: "#5952b3",
  [colorSyntaxEnum]: "#2d8a4a",
  [colorSyntaxUnion]: "#2d8a7a",
  [colorSyntaxScalar]: "#c2410c",
  [colorSyntaxInput]: "#2d8a4a",
  [colorSyntaxType]: "#b35900",
};

// Dark theme
const darkVars: Record<string, string> = {
  ...lightVars,
  [colorCanvasBase]: "#1d1d1d",
  [colorCanvasHover]: "#2d2640",
  [colorCanvasActive]: "#382f4d",
  [colorCanvasElevated05]: "#262626",
  [colorCanvasElevated10]: "#333333",
  [colorCodeblockBg]: "#232323",
  [colorTooltipBg]: "#171717",
  [colorTooltipActive]: "#262626",
  [colorTextBase]: "#cccccc",
  [colorTextDimmedBase]: "#b3b3b3",
  [colorTextDimmedHover]: "#e6e6e6",
  [colorTextDimmedActive]: "#b3b3b3",
  [colorDividerBase]: "#333333",
  [colorPrimaryHover]: "#8584d9",
  [colorPrimaryActive]: "#9392e0",
  [colorPrimaryContrast]: "#262626",
  [colorSecondaryBase]: "#FFE248",
  [colorSyntaxBase]: "#4da6ff",
  [colorSyntaxAtom]: "#e6e6e6",
  [colorSyntaxAttrName]: "#4da6ff",
  [colorSyntaxBoolean]: "#b3a1e6",
  [colorSyntaxBuiltin]: "#b3a1e6",
  [colorSyntaxClassName]: "#4da6b3",
  [colorSyntaxComment]: "#5cb37a",
  [colorSyntaxConstant]: "#4da6ff",
  [colorSyntaxDescription]: "#999999",
  [colorSyntaxFunction]: "#e6e6e6",
  [colorSyntaxKeyword]: "#b3a1e6",
  [colorSyntaxMeta]: "#F65151",
  [colorSyntaxNull]: "#999999",
  [colorSyntaxNumber]: "#5cb37a",
  [colorSyntaxOperator]: "#e6e6e6",
  [colorSyntaxProperty]: "#4da6ff",
  [colorSyntaxPunctuation]: "#e6e6e6",
  [colorSyntaxString]: "#f0a070",
  [colorSyntaxVariable]: "#4da6ff",
  [colorSyntaxInterface]: "#b3a1e6",
  [colorSyntaxEnum]: "#5cb37a",
  [colorSyntaxUnion]: "#4da6b3",
  [colorSyntaxScalar]: "#f0a070",
  [colorSyntaxInput]: "#b3a1e6",
  [colorSyntaxType]: "#4da6ff",
};

// Create themes using style() with vars
export const lightThemeClass = style({ vars: lightVars });
export const darkThemeClass = style({ vars: darkVars });
