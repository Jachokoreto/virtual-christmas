import { Decoration } from "../types";

// Type for the callback function
type DecorationCallback = (decorations: Decoration[]) => void;

// Store callbacks and decorations in memory
let decorations: Decoration[] = [];
const subscribers: DecorationCallback[] = [];

// Helper to notify all subscribers
const notifySubscribers = () => {
  subscribers.forEach((callback) => callback([...decorations]));
};

// Subscribe to decoration updates
export const subscribeToDecorations = (callback: DecorationCallback) => {
  subscribers.push(callback);

  // Initial callback with current data
  callback([...decorations]);

  // Return unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Add a new decoration
export const addDecoration = async (decoration: Omit<Decoration, "id">) => {
  const newDecoration: Decoration = {
    ...decoration,
    id: Math.random().toString(36).substr(2, 9), // Generate random ID
  };

  decorations.push(newDecoration);
  notifySubscribers();

  return newDecoration;
};

// Optional: Add these utility functions for development
export const clearDecorations = () => {
  decorations = [];
  notifySubscribers();
};

export const addTestDecorations = () => {
  decorations = [
    {
      id: "1",
      type: "bauble",
      position: [0, 1, 0],
      message: "Test wish 1",
      name: "John",
      createdAt: Date.now() - 1000,
    },
    {
      id: "2",
      type: "bauble",
      position: [1, 1, 0],
      message: "Test wish 2",
      name: "Jane",
      createdAt: Date.now(),
    },
  ];
  notifySubscribers();
};
