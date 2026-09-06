vi.mock("../hooks", () => ({
  useOrientationWatcher: vi.fn(),
}));

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useOrientationWatcher } from "../hooks";
import { Pane } from "./Pane";

const useOrientation = useOrientationWatcher as vi.Mocked<any>;
const addEventListener = vi.spyOn(window, "addEventListener");

beforeEach(vi.clearAllMocks);

describe("on mount", () => {
  describe("on portrait orientation", () => {
    beforeEach(() => {
      useOrientation.mockReturnValue({ isPortrait: true, isLandscape: false });
    });

    it("matches snapshot", () => {
      const { container } = render(<Pane />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("on landscape orientation", () => {
    beforeEach(() => {
      useOrientation.mockReturnValue({
        isPortrait: false,
        isLandscape: true,
      });
    });

    it("matches snapshot", () => {
      const { container } = render(<Pane />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe("on mouse down", () => {
  beforeEach(() => {
    render(<Pane />);
    const separator = screen.getAllByRole("seperator")[0];
    fireEvent.mouseDown(separator, { button: 0 });
  });

  it("listens for mouse up events", () => {
    expect(addEventListener).toHaveBeenCalledWith(
      "mouseup",
      expect.any(Function),
    );
  });

  it("listens for mouse move events", () => {
    expect(addEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
  });
});
