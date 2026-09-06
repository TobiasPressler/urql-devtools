import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Disconnected } from "./Disconnected";

vi.mock("../../../assets/icon.svg", () => ({
  default: (props: any) => <svg data-testid="icon" {...props} />,
}));

describe("on mount", () => {
  it("matches snapshot", () => {
    const { container } = render(<Disconnected />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
