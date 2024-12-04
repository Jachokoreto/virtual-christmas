import { Canvas } from "@react-three/fiber";
import { Environment, Grid, OrbitControls, Stage } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Decoration } from "./types";
import { ChristmasTree } from "./models/ChristmasTree";
import * as THREE from "three";
import { Bauble } from "./components/Bauble";
import { ThreeEvent } from "@react-three/fiber";
import {
  subscribeToDecorations,
  addDecoration,
} from "./firebase/decorationService";
import { useControls } from "leva";
import { WishModal } from "./components/WishModal";
import toast from "react-hot-toast";

function Scene({
  decorations,
  onTreeClick,
}: {
  decorations: Decoration[];
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void;
}) {
  const { treePosition, treeScale } = useControls("Tree", {
    treePosition: {
      value: { x: 0, y: 1, z: 0 },
      step: 0.1,
    },
    treeScale: {
      value: 0.01,
      step: 0.001,
    },
    treeRotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
    },
  });

  const { directionalIntensity, directionalPosition } = useControls(
    "Lighting",
    {
      directionalIntensity: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
      },
      directionalPosition: {
        value: { x: 10, y: 10, z: 5 },
        step: 1,
      },
    }
  );

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[
          directionalPosition.x,
          directionalPosition.y,
          directionalPosition.z,
        ]}
        intensity={directionalIntensity}
        castShadow
      />
      <ChristmasTree
        position={[treePosition.x, 0, treePosition.z]}
        scale={[treeScale, treeScale, treeScale]}
        onClick={onTreeClick}
      />
      {/* <ChristmasTree
        position={[4, 0, 0]}
        scale={[treeScale, treeScale, treeScale]}
        rotation={[treeRotation.x, treeRotation.y, treeRotation.z]}
        onClick={onTreeClick}
      /> */}
      {decorations.map((decoration) => (
        <Bauble
          key={decoration.id}
          id={decoration.id}
          position={decoration.position}
          color={decoration.color}
        />
      ))}
    </>
  );
}

function App() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isPlacingDecoration, setIsPlacingDecoration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDecoration, setPendingDecoration] = useState<{
    type: Decoration["type"];
    message: string;
    color: string;
  } | null>(null);

  // Subscribe to decoration updates
  useEffect(() => {
    const unsubscribe = subscribeToDecorations((updatedDecorations) => {
      setDecorations(updatedDecorations);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddWish = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = (
    type: Decoration["type"],
    message: string,
    color: string
  ) => {
    setPendingDecoration({ type, message, color });
    setIsModalOpen(false);
    setIsPlacingDecoration(true);
  };

  const handleTreeClick = async (event: ThreeEvent<MouseEvent>) => {
    if (!isPlacingDecoration || !pendingDecoration) return;

    event.stopPropagation();
    const point = event.point;

    try {
      await addDecoration({
        type: pendingDecoration.type,
        position: [point.x, point.y, point.z],
        color: pendingDecoration.color,
        message: pendingDecoration.message,
        createdAt: Date.now(),
      });

      setIsPlacingDecoration(false);
      toast.success("decorations placed successfully!");
      setPendingDecoration(null);
    } catch (error) {
      console.error("Error adding decoration:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col relative">
      {/* Canvas container - now takes full width */}
      <div className="flex-1">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            // position: [0, -100, 0],
            // fov: 30,
            // near: 0.1,
            // far: 1000,
            // // zoom: 1
            position: [0, 0, 12],
            fov: 40,
          }}
        >
          <fog attach="fog" args={["black", 15, 22.5]} />
          <Stage
            intensity={0.5}
            environment="city"
            shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
            adjustCamera={false}
          >
            <Scene decorations={decorations} onTreeClick={handleTreeClick} />
          </Stage>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={true}
            // minDistance={9} // Minimum zoom distance
            // maxDistance={12} // Maximum zoom distance
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
          />
          <Environment background preset="sunset" blur={0.8} />
        </Canvas>
      </div>

      {/* Bottom centered button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className={`
            px-8 py-4 rounded-full
            ${
              isPlacingDecoration
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            }
            text-white text-lg font-semibold
            transition-colors duration-200
            shadow-lg hover:shadow-xl
            flex items-center justify-center gap-2
          `}
          onClick={handleAddWish}
          disabled={isPlacingDecoration}
        >
          {isPlacingDecoration ? (
            <>
              <span className="animate-pulse w-[220px]">
                Click on tree to place
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Add Wish</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}

export default App;
