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
// import { db } from "./config";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   getDocs,
// } from "firebase/firestore";
// import { Decoration } from "../types";

// const DECORATIONS_COLLECTION = "decorations";

// export const addDecoration = async (decoration: Omit<Decoration, "id">) => {
//   try {
//     const docRef = await addDoc(
//       collection(db, DECORATIONS_COLLECTION),
//       decoration
//     );
//     return { ...decoration, id: docRef.id };
//   } catch (error) {
//     console.error("Error adding decoration:", error);
//     throw error;
//   }
// };

// export const subscribeToDecorations = (
//   onUpdate: (decorations: Decoration[]) => void
// ) => {
//   const q = query(collection(db, DECORATIONS_COLLECTION));

//   return onSnapshot(q, (querySnapshot) => {
//     const decorations = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Decoration[];
//     onUpdate(decorations);
//   });
// };

// export const getDecorations = async (): Promise<Decoration[]> => {
//   const q = query(collection(db, DECORATIONS_COLLECTION));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Decoration[];
// };
