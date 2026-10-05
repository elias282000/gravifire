export const playerMovementConfig = { walkSpeed: 3.2, sprintSpeed: 4.9, crouchSpeed: 1.8, acceleration: 18, deceleration: 22, airControl: 0.28, standingHeight: 1.85, crouchingHeight: 1.25, baseFov: 74, sprintFovDelta: 4, headBobWalk: 0.018, headBobSprint: 0.028, headBobCrouch: 0.008 } as const;
export type MovementState = "WALK" | "SPRINT" | "CROUCH";
export type FPSSettings = { headBob: boolean; cameraSway: boolean; sprintFov: boolean; reducedMotion: boolean; sensitivity: number; quality: "LOW" | "STANDARD" };
export const defaultFPSSettings: FPSSettings = { headBob: true, cameraSway: true, sprintFov: true, reducedMotion: false, sensitivity: 1, quality: "STANDARD" };
export function movementState(keys: { moving: boolean; sprint: boolean; crouch: boolean }): MovementState { if (keys.crouch) return "CROUCH"; if (keys.sprint && keys.moving) return "SPRINT"; return "WALK"; }
export function movementSpeed(state: MovementState): number { return state === "SPRINT" ? playerMovementConfig.sprintSpeed : state === "CROUCH" ? playerMovementConfig.crouchSpeed : playerMovementConfig.walkSpeed; }
export function parseFPSSettings(value: string | null): FPSSettings { if (!value) return defaultFPSSettings; try { const parsed = JSON.parse(value) as Partial<FPSSettings>; return { ...defaultFPSSettings, ...parsed, quality: parsed.quality === "LOW" ? "LOW" : "STANDARD" }; } catch { return defaultFPSSettings; } }
export function nextToolState(current: "IDLE" | "FOCUS" | "INSPECT", action: "FOCUS_ON" | "FOCUS_OFF" | "INSPECT"): "IDLE" | "FOCUS" | "INSPECT" { if (action === "FOCUS_ON") return "FOCUS"; if (action === "FOCUS_OFF") return "IDLE"; return current === "INSPECT" ? "IDLE" : "INSPECT"; }
export const m6RefusalScanStages = ["EVIDENCE MATCH REQUESTED", "GRAVITY", "ATMOSPHERE", "APPLICATION / GEOMETRY", "MATERIAL / CONFIGURATION", "VERDICT GENERATION BLOCKED"] as const;
export function nextM6RefusalScanStage(stage: number): number { return Math.min(Math.max(stage, 0) + 1, m6RefusalScanStages.length); }
export function togglePause(paused: boolean): boolean { return !paused; }
