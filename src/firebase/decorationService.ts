import {
  subscribeToDecorations as firebaseSubscribe,
  addDecoration as firebaseAdd,
} from "./firebaseDecorationService"; // Rename your existing service file

import {
  subscribeToDecorations as mockSubscribe,
  addDecoration as mockAdd,
} from "./mockDecorationService";

// Use environment variable or a constant to determine which service to use
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || true;

export const subscribeToDecorations = USE_MOCK
  ? mockSubscribe
  : firebaseSubscribe;
export const addDecoration = USE_MOCK ? mockAdd : firebaseAdd;
