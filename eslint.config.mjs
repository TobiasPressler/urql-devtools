// @ts-check

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "cosmos-export/**",
    "extension.zip",
    // react-cosmos fixtures/decorator still import the now-removed
    // styled-components package; tsconfig.json already excludes these
    // from type-checking for the same reason.
    "**/*.fixture.tsx",
    "src/panel/cosmos.*",
  ]),
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      importPlugin.flatConfigs.errors,
      importPlugin.flatConfigs.typescript,
      // Runs Prettier as a lint rule and disables any core/plugin rules
      // that would conflict with it. Must come last so nothing after it
      // re-enables a conflicting rule.
      eslintPluginPrettierRecommended,
    ],
    settings: {
      react: {
        // Not "detect": eslint-plugin-react@7.37.5's version detection calls
        // the removed `context.getFilename()` API and crashes under ESLint
        // 10. Update this when bumping the installed React version.
        version: "19.2.8",
      },
    },
    rules: {
      "import-x/order": ["error", { "newlines-between": "never" }],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/prop-types": "off",
      "react/no-children-prop": "off",
    },
  },
]);
