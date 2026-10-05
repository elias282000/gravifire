export const tutorialStorageKey = "gravifire-tutorial-controls-seen";
export function shouldShowTutorial(value: string | null): boolean { return value !== "1"; }
export function markTutorialSeen(): string { return "1"; }
