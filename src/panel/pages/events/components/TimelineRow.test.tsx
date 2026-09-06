vi.mock("./TimelineEvent", () => ({
  TimelineEvent: () => <div data-testid="timeline-event">TimelineEvent</div>,
}));
import { beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

const dateNow = vi.spyOn(Date, "now");

beforeAll(() => {
  dateNow.mockReturnValue(3000);
});

describe("on fetching", () => {
  describe("network duration", () => {
    it("is fetching", async () => {
      const { default: fixtures } = await import("./TimelineRow.fixture");
      dateNow.mockReturnValue(5000);
      const { container } = render(fixtures["network fetching"]);

      const duration = container.querySelector('[data-state="fetching"]');
      expect(duration).toBeTruthy();
      expect(duration!.getAttribute("data-state")).toBe("fetching");
    });

    it("grows to current time", async () => {
      const { default: fixtures } = await import("./TimelineRow.fixture");
      const { container } = render(fixtures["network fetching"]);

      const duration = container.querySelector('[data-state="fetching"]');
      expect(duration).toBeTruthy();
      expect(duration!.getAttribute("style")).toMatchInlineSnapshot(
        `"position: absolute; left: 0px; right: 280px; bottom: 0px;"`,
      );
    });
  });
});
