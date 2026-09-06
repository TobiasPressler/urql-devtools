import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

process.env.BUILD_ENV = "extension";
process.env.PKG_VERSION = "200.0.0";

declare const global: {
  chrome: {
    devtools: {
      inspectedWindow: {
        eval: () => any;
      };
      panels: {
        themeName: "default" | "dark";
      };
    };
  };
  matchMedia: any;
  ResizeObserver: ResizeObserver;
};

global.ResizeObserver = function ResizeObserver() {
  return {
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  };
} as any;
global.matchMedia = vi.fn(() => {
  return {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as any;
});
global.chrome = {
  devtools: {
    inspectedWindow: {
      eval: vi.fn(),
    },
    panels: {
      themeName: "dark",
    },
  },
};
