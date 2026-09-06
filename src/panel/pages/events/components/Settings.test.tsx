import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import fixtures from "./Settings.fixture";

describe("on icon click", () => {
  it("expands content", () => {
    render(fixtures.settings);
    const button = screen.getByTitle("Show filters");
    fireEvent.click(button);

    const collapsible = document.querySelector("[aria-expanded]");
    expect(collapsible).toHaveAttribute("aria-expanded", "true");
  });
});

describe("on filter click", () => {
  it("enables filters", () => {
    render(fixtures.filter);
    const checkboxes = screen.getAllByRole("checkbox");
    const unchecked = checkboxes.filter(
      (b) => b.getAttribute("aria-selected") === "false",
    );

    unchecked.forEach((b) => fireEvent.click(b));

    const allCheckboxes = screen.getAllByRole("checkbox");
    allCheckboxes.forEach((b) =>
      expect(b).toHaveAttribute("aria-selected", "true"),
    );
  });

  it("disables filters", () => {
    render(fixtures.filter);
    const checkboxes = screen.getAllByRole("checkbox");
    const checked = checkboxes.filter(
      (b) => b.getAttribute("aria-selected") === "true",
    );

    checked.forEach((b) => fireEvent.click(b));

    const allCheckboxes = screen.getAllByRole("checkbox");
    allCheckboxes.forEach((b) =>
      expect(b).toHaveAttribute("aria-selected", "false"),
    );
  });
});
