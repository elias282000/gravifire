import { describe, expect, it } from "vitest";
import { markTutorialSeen, shouldShowTutorial } from "@/lib/tutorial-state";

describe("tutorial state", () => {
  it("shows once and persists dismissal", () => {
    expect(shouldShowTutorial(null)).toBe(true);
    expect(shouldShowTutorial(markTutorialSeen())).toBe(false);
  });
});
