import { describe, expect, it } from "vitest";
import { parseCameraMode, toggleCameraMode } from "@/lib/camera-state";

describe("camera preference", () => {
  it("defaults to third person", () => expect(parseCameraMode(null)).toBe("THIRD_PERSON"));
  it("toggles without touching mission state", () => { expect(toggleCameraMode("THIRD_PERSON")).toBe("FIRST_PERSON"); expect(toggleCameraMode("FIRST_PERSON")).toBe("THIRD_PERSON"); });
  it("recovers invalid stored values safely", () => expect(parseCameraMode("unexpected")).toBe("THIRD_PERSON"));
});
