export type CameraMode = "THIRD_PERSON" | "FIRST_PERSON";
export const CAMERA_MODE_STORAGE_KEY = "gravifire-camera-mode";
export function parseCameraMode(value: string | null): CameraMode { return value === "FIRST_PERSON" ? "FIRST_PERSON" : "THIRD_PERSON"; }
export function toggleCameraMode(mode: CameraMode): CameraMode { return mode === "THIRD_PERSON" ? "FIRST_PERSON" : "THIRD_PERSON"; }
