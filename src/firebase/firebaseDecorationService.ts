import { db } from "./config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  getDocs,
} from "firebase/firestore";
import { Decoration } from "../types";

const DECORATIONS_COLLECTION = "decorations";

export const addDecoration = async (decoration: Omit<Decoration, "id">) => {
  try {
    const docRef = await addDoc(
      collection(db, DECORATIONS_COLLECTION),
      decoration
    );
    return { ...decoration, id: docRef.id };
  } catch (error) {
    console.error("Error adding decoration:", error);
    throw error;
  }
};

export const subscribeToDecorations = (
  onUpdate: (decorations: Decoration[]) => void
) => {
  const q = query(collection(db, DECORATIONS_COLLECTION));

  return onSnapshot(q, (querySnapshot) => {
    const decorations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Decoration[];
    onUpdate(decorations);
  });
};

export const getDecorations = async (): Promise<Decoration[]> => {
  const q = query(collection(db, DECORATIONS_COLLECTION));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Decoration[];
};
