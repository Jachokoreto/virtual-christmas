import { create } from "zustand";
import { Decoration } from "../types";
import { CameraControls } from "@react-three/drei";

type WISH_STEPS = "ornament" | "position" | "message" 

interface InteractionState {
    selectedBauble: Decoration | null;
    wishStep: WISH_STEPS;
    isAddingWish: boolean;
    cameraRef: React.RefObject<CameraControls> | null;

    setSelectedBauble: (bauble: Decoration) => void;
    setWishStep: (newwishStep: WISH_STEPS) => void;
    setIsAddingWish: (x: boolean) => void;
    setCameraRef: (ref: React.RefObject<CameraControls>) => void;
  }
  
// Zustand store for interaction state management
const useInteractionStore = create<InteractionState>((set) => ({
  selectedBauble: null,
  wishStep: "ornament", 
  isAddingWish: false,
  cameraRef: null,
  // Actions
  setSelectedBauble: (bauble: Decoration) => set({ selectedBauble: bauble }),
  setWishStep: (newwishStep) => set({ wishStep: newwishStep }),
  setIsAddingWish: (x) => set({isAddingWish: x}),
  setCameraRef: (ref: React.RefObject<CameraControls>) => set({ cameraRef: ref })
}));

export default useInteractionStore;
