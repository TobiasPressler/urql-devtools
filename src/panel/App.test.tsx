const mockAddMessageHandler = vi.fn(() => () => false);
const mockSendMessage = vi.fn();

vi.mock("./context/Devtools.tsx", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useDevtoolsContext: vi.fn(),
  };
});
vi.mock("../assets/icon.svg", () => ({
  default: (props: any) => <svg data-testid="icon" {...props} />,
}));
vi.mock("./components/CodeHighlight", () => ({
  CodeHighlight: ({ code }: { code: string }) => (
    <pre data-testid="code-highlight">{code}</pre>
  ),
}));
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mocked,
} from "vitest";
import { render } from "@testing-library/react";
import { App, AppRoutes } from "./App";
import { useDevtoolsContext } from "./context";
import { darkThemeClass, lightThemeClass } from "./theme.css";

describe("App", () => {
  beforeEach(() => {
    (useDevtoolsContext as Mocked<any>).mockReturnValue({
      client: { connected: false },
      addMessageHandler: mockAddMessageHandler,
      sendMessage: mockSendMessage,
    } as any);
  });

  describe("on mount", () => {
    it("matches snapshot", () => {
      const { container } = render(<App />);
      expect(container.firstChild).toMatchSnapshot();
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

    it("applies the dark theme class to the document body", () => {
      const { unmount } = render(<App />);
      expect(document.body.classList.contains(darkThemeClass)).toBe(true);
      unmount();
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

    it("applies the light theme class to the document body", () => {
      const { unmount } = render(<App />);
      expect(document.body.classList.contains(lightThemeClass)).toBe(true);
      unmount();
    });
  });
});

describe("App routes", () => {
  describe("on mount", () => {
    describe("on connected", () => {
      beforeEach(() => {
        (useDevtoolsContext as Mocked<any>).mockReturnValue({
          client: {
            connected: true,
            version: {
              mismatch: false,
            },
          },
          addMessageHandler: mockAddMessageHandler,
          sendMessage: mockSendMessage,
        } as any);
      });

      it("matches snapshot", () => {
        const { container } = render(<AppRoutes />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe("on version mismatch", () => {
      beforeEach(() => {
        (useDevtoolsContext as Mocked<any>).mockReturnValue({
          client: {
            connected: true,
            version: {
              required: "9.9.9",
              actual: "0.0.1",
              mismatch: true,
            },
          },
          addMessageHandler: mockAddMessageHandler,
          sendMessage: mockSendMessage,
        } as any);
      });

      it("matches snapshot", () => {
        const { container } = render(<AppRoutes />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe("on disconnected", () => {
      beforeEach(() => {
        (useDevtoolsContext as Mocked<any>).mockReturnValue({
          client: {
            connected: false,
          },
          addMessageHandler: mockAddMessageHandler,
          sendMessage: mockSendMessage,
        } as any);
      });

      it("matches snapshot", () => {
        const { container } = render(<AppRoutes />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
