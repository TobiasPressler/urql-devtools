jest.mock("./context/Devtools.tsx", () => {
  return {
    ...(jest.requireActual("./context/Devtools.tsx") as Record<
      string,
      unknown
    >),
    useDevtoolsContext: jest.fn(),
  };
});
import React from "react";
import { shallow, mount } from "enzyme";
import { App, AppRoutes } from "./App";
import { useDevtoolsContext } from "./context";
import { darkThemeClass, lightThemeClass } from "./theme.css";

describe("App", () => {
  describe("on mount", () => {
    it("matches snapshot", () => {
      expect(shallow(<App />)).toMatchSnapshot();
    });
  });

  describe("in dark mode", () => {
    const origThemeName = chrome.devtools.panels.themeName;

    beforeAll(() => {
      chrome.devtools.panels.themeName = "dark";
    });

    afterAll(() => {
      chrome.devtools.panels.themeName = origThemeName;
    });

    beforeEach(() => {
      (useDevtoolsContext as jest.Mocked<any>).mockReturnValue({
        client: { connected: false },
      } as any);
    });

    it("applies the dark theme class to the document body", () => {
      const wrapper = mount(<App />);

      expect(document.body.classList.contains(darkThemeClass)).toBe(true);

      wrapper.unmount();
    });
  });

  describe("in light mode", () => {
    const origThemeName = chrome.devtools.panels.themeName;

    beforeAll(() => {
      chrome.devtools.panels.themeName = "default";
    });

    afterAll(() => {
      chrome.devtools.panels.themeName = origThemeName;
    });

    beforeEach(() => {
      (useDevtoolsContext as jest.Mocked<any>).mockReturnValue({
        client: { connected: false },
      } as any);
    });

    it("applies the light theme class to the document body", () => {
      const wrapper = mount(<App />);

      expect(document.body.classList.contains(lightThemeClass)).toBe(true);

      wrapper.unmount();
    });
  });
});

describe("App routes", () => {
  describe("on mount", () => {
    describe("on connected", () => {
      beforeEach(() => {
        (useDevtoolsContext as jest.Mocked<any>).mockReturnValue({
          client: {
            connected: true,
            version: {
              mismatch: false,
            },
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });

    describe("on version mismatch", () => {
      beforeEach(() => {
        (useDevtoolsContext as jest.Mocked<any>).mockReturnValue({
          client: {
            connected: true,
            version: {
              required: "9.9.9",
              actual: "0.0.1",
              mismatch: true,
            },
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });

    describe("on disconnected", () => {
      beforeEach(() => {
        (useDevtoolsContext as jest.Mocked<any>).mockReturnValue({
          client: {
            connected: false,
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });
  });
});
