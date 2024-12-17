import toast from "react-hot-toast";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Decoration } from "./types";
import { ChristmasTree } from "./models/ChristmasTree";
import * as THREE from "three";
import { Bauble } from "./components/Bauble";
import { ThreeEvent } from "@react-three/fiber";
import {
  subscribeToDecorations,
  addDecoration,
} from "./firebase/decorationService";
import { WishModal } from "./components/WishModal";
import { MessageModal } from "./components/MessageModal";
import { SantaClaus } from "./components/ornaments/SantaClaus";
import { GingerHouse } from "./components/ornaments/GingerHouse";
import { Cone } from "./components/ornaments/Cone";
import { Sphere } from "./components/ornaments/Sphere";
import { Star } from "./components/ornaments/Star";
import { SocksOne } from "./components/ornaments/SocksOne";
import { SocksTwo } from "./components/ornaments/SocksTwo";
import { SocksThree } from "./components/ornaments/SocksThree";
import { GingerTreeOne } from "./components/ornaments/GingerTreeOne";
import { GingerTreeTwo } from "./components/ornaments/GingerTreeTwo";
import { GingerSnowflakeOne } from "./components/ornaments/GingerSnowflakeOne";
import { GingerSnowflakeTwo } from "./components/ornaments/GingerSnowflakeTwo";
import { ButtonMakeAWish } from "./components/ButtonMakeAWish";
import WishesPanel from "./components/WishesPanel";

function Scene({
  decorations,
  onTreeClick,
  onDecorationClick,
}: {
  decorations: Decoration[];
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void;
  onDecorationClick: (decoration: Decoration) => void;
}) {
  const [visibleDecoration, setVisibleDecoration] = useState<Decoration | null>(
    null
  );
  const groupRef = useRef<THREE.Group>(null);

  const handleAdjustedClick = (event: ThreeEvent<MouseEvent>) => {
    if (!groupRef.current) return;

    // Get world matrix of the group
    const worldMatrix = groupRef.current.matrixWorld.clone();
    const inverseMatrix = worldMatrix.invert();

    // Clone the intersection point
    const point = event.point.clone();

    // Transform the point
    point.applyMatrix4(inverseMatrix);

    // Call the original click handler with the adjusted point
    onTreeClick({
      ...event,
      point,
    });
  };

  useEffect(() => {
    console.log(visibleDecoration);
  }, [visibleDecoration]);

  return (
    <Stage
      intensity={0.3}
      preset="soft"
      environment="lobby"
      adjustCamera={false}
    >
      <group ref={groupRef}>
        <ChristmasTree
          position={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
          onClick={handleAdjustedClick}
        />
        {decorations.map((decoration) => (
          <group key={decoration.id}>
            {/* <Bauble
              id={decoration.id}
              position={decoration.position}
              onVisible={() => setVisibleDecoration(decoration)}
              onHidden={() => setVisibleDecoration(null)}
              onClick={() => onBaubleClick(decoration)}
            /> */}
            <SantaClaus
              id={decoration.id}
              scale={0.2}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerHouse
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Cone
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Sphere
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Star
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksOne
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksTwo
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksThree
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerTreeOne
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerTreeTwo
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerSnowflakeOne
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerSnowflakeTwo
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
          </group>
        ))}
      </group>
    </Stage>
  );
}

function App() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isPlacingDecoration, setIsPlacingDecoration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecoration, setSelectedDecoration] =
    useState<Decoration | null>(null);
  const [pendingDecoration, setPendingDecoration] = useState<{
    type: Decoration["type"];
    message: string;
    name: string;
  } | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth > 768);
  const [views, setViews] = useState<Record<string, HTMLDivElement>>({});
  const ref = useRef<HTMLDivElement>(null);

  // Subscribe to decoration updates
  useEffect(() => {
    const unsubscribe = subscribeToDecorations((updatedDecorations) => {
      console.log({ updatedDecorations });
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
    name: string
  ) => {
    setPendingDecoration({ type, message, name });
    setIsModalOpen(false);
    setIsPlacingDecoration(true);
  };

  const handleTreeClick = async (event: ThreeEvent<MouseEvent>) => {
    if (!isPlacingDecoration || !pendingDecoration) return;

    event.stopPropagation();
    const point = event.point;
    const normal = event.face!.normal;
    const worldNormal = new THREE.Vector3()
      .copy(normal)
      .applyQuaternion(event.object.quaternion)
      .normalize();

    try {
      await addDecoration({
        type: pendingDecoration.type,
        position: [point.x, point.y, point.z],
        normal: [worldNormal.x, worldNormal.y, worldNormal.z],
        message: pendingDecoration.message,
        name: pendingDecoration.name,
        createdAt: Date.now(),
      });

      setIsPlacingDecoration(false);
      toast.success("Wish placed successfully!");
      setPendingDecoration(null);
    } catch (error) {
      console.error("Error adding decoration:", error);
    }
  };

  const handleExportData = () => {
    // Prepare the data with only necessary fields
    const exportData = decorations.map((decoration) => ({
      message: decoration.message,
      name: decoration.name,
      color: decoration.color,
      createdAt: new Date(decoration.createdAt).toLocaleString(),
    }));

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wishes-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-[#f0f0f0]"
      ref={ref}
    >
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm md:hidden"
      >
        {isPanelOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <WishesPanel
        decorations={decorations}
        handleExportData={handleExportData}
        isPanelOpen={isPanelOpen}
      />

      {/* Canvas container with responsive margin */}
      <div
        className={`
        flex-1 relative z-0
        transition-[margin] duration-300 ease-in-out
        md:ml-80
        ${isPanelOpen ? "ml-80" : "ml-0"}
      `}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          flat
          camera={{
            position: [0, 0, 11],
            fov: 40,
          }}
        >
          <ambientLight intensity={0.6} />

          {/* <Stage intensity={0.3} preset="soft" environment="lobby" adjustCamera={false} c> */}
          <Scene
            decorations={decorations}
            onTreeClick={handleTreeClick}
            onDecorationClick={(decoration) =>
              setSelectedDecoration(decoration)
            }
          />
          {/* </Stage> */}

          <OrbitControls
            autoRotate
            autoRotateSpeed={2}
            makeDefault
            minDistance={8} // Minimum zoom distance
            maxDistance={11} // Maximum zoom distance
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      <MessageModal
        isOpen={selectedDecoration !== null}
        onClose={() => setSelectedDecoration(null)}
        message={selectedDecoration?.message || ""}
      />

      <ButtonMakeAWish
        isPlacingDecoration={isPlacingDecoration}
        handleAddWish={handleAddWish}
      />

      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}

export default App;
