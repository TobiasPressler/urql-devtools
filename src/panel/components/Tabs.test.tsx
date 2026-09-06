import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";

beforeEach(vi.clearAllMocks);

const props = {
  active: "a",
  options: [
    { label: "first", value: "a" },
    { label: "second", value: "b" },
  ],
  setActive: vi.fn(),
};

describe("on mount", () => {
  it("matches snapshot", () => {
    const { container } = render(<Tabs {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("on tab click", () => {
  it("calls setActive", () => {
    render(<Tabs {...props} />);
    const tabs = screen.getAllByRole("heading");
    fireEvent.click(tabs[1]);
    expect(props.setActive).toHaveBeenCalledWith("b");
  });
});
