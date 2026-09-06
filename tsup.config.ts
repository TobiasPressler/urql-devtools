import { readFile } from "node:fs/promises";
import type { Plugin } from "esbuild";
import svgr from "esbuild-plugin-svgr";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url), "utf-8")
);

/** Stub electron for extension builds (replaces require('electron') with empty object). */
function electronStub(): Plugin {
  return {
    name: "electron-stub",
    setup(build) {
      build.onResolve({ filter: /^electron$/ }, () => ({
        path: "electron",
        namespace: "electron-stub",
      }));
      build.onLoad({ filter: /.*/, namespace: "electron-stub" }, () => ({
        contents: "module.exports = {}",
        loader: "js",
      }));
    },
  };
}

/** Leave require('electron') as a runtime call for Electron shell builds. */
function electronExternal(): Plugin {
  return {
    name: "electron-external",
    setup(build) {
      build.onResolve({ filter: /^electron$/ }, () => ({
        path: "electron",
        namespace: "electron-external",
      }));
      build.onLoad({ filter: /.*/, namespace: "electron-external" }, () => ({
        contents: "module.exports = window.require('electron')",
        loader: "js",
      }));
    },
  };
}

const isExtension = process.env.BUILD_ENV !== "electron";

const sharedDefine = {
  "process.env.NODE_ENV": JSON.stringify(
    process.env.NODE_ENV || "development"
  ),
  "process.env.BUILD_ENV": JSON.stringify(
    process.env.BUILD_ENV || "extension"
  ),
  "process.env.PKG_VERSION": JSON.stringify(pkg.version),
};


export default defineConfig(
  isExtension
    ? {
        entry: {
          background: "src/extension/background.ts",
          devtools: "src/extension/devtools.ts",
          content_script: "src/extension/content_script.ts",
          "prism-panel": "src/panel/prism.ts",
          panel: "src/panel/panel.tsx",
        },
        outDir: "dist/extension",
        format: "iife",
        platform: "browser",
        outExtension: () => ({ js: ".js" }),
        sourcemap: true,
        clean: true,
        splitting: false,
        define: sharedDefine,
        esbuildPlugins: [electronStub(), svgr(), vanillaExtractPlugin(), nodeModulesPolyfillPlugin()],
        onSuccess: "node scripts/build-extension.js",
      }
    : [
        {
          entry: { main: "src/electron/main.ts" },
          outDir: "dist/electron",
          format: "cjs",
          platform: "node",
          outExtension: () => ({ js: ".js" }),
          sourcemap: true,
          clean: true,
          splitting: false,
          define: sharedDefine,
        },
        {
          entry: {
            "prism-panel": "src/panel/prism.ts",
            panel: "src/panel/panel.tsx",
          },
          outDir: "dist/electron/shell",
          format: "iife",
          platform: "browser",
          outExtension: () => ({ js: ".js" }),
          sourcemap: true,
          splitting: false,
          define: sharedDefine,
          esbuildPlugins: [electronExternal(), svgr(), vanillaExtractPlugin(), nodeModulesPolyfillPlugin()],
          onSuccess: "node scripts/build-electron.js",
        },
      ]
);
