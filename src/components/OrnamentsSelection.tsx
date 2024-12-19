import { useState, useRef, useEffect } from "react";
import { Center, Text, Html, CameraControls } from "@react-three/drei";
import { Bauble } from "./Bauble";
import useInteractionStore from "../store/interactionStore";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

const DECORATION_CHOICES = [
  { type: "bauble", label: "Red Bauble", color: "#ff0000" },
  { type: "bauble", label: "Blue Bauble", color: "#0000ff" },
  { type: "bauble", label: "Green Bauble", color: "#00ff00" },
  { type: "bauble", label: "Gold Bauble", color: "#ffd700" },
  { type: "bauble", label: "Silver Bauble", color: "#c0c0c0" },
  { type: "bauble", label: "Purple Bauble", color: "#800080" },
  { type: "bauble", label: "Pink Bauble", color: "#ff69b4" },
];

function OrnamentsSelection() {
  const [selectedBauble, setSelectedBauble] = useState<string | null>(null);
  const { isAddingWish } = useInteractionStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetRotation = useRef(0);
  const groupRef = useRef<Group>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

  // Calculate visible decorations (current, prev, next)
  const visibleDecorations = [
    DECORATION_CHOICES[
      (currentIndex - 1 + DECORATION_CHOICES.length) % DECORATION_CHOICES.length
    ],
    DECORATION_CHOICES[currentIndex],
    DECORATION_CHOICES[(currentIndex + 1) % DECORATION_CHOICES.length],
  ];

  // Control camera when selection is active
  useEffect(() => {
    if (isAddingWish && cameraControlsRef.current) {
      // Disable user input
      cameraControlsRef.current.enabled = false;
      cameraControlsRef.current.enableDamping = false;

      // Move camera to view ornaments
      const targetPosition = new Vector3(0, 5, 5);
      cameraControlsRef.current.setLookAt(
        0,
        5,
        12, // camera position
        targetPosition.x,
        targetPosition.y,
        targetPosition.z, // target
        true // animate
      );

      return () => {
        if (cameraControlsRef.current) {
          cameraControlsRef.current.enabled = true;
        }
      };
    }
  }, [isAddingWish]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate the rotation
      groupRef.current.rotation.y +=
        (targetRotation.current - groupRef.current.rotation.y) * 0.1;
    }
  });

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + DECORATION_CHOICES.length) % DECORATION_CHOICES.length
    );
    targetRotation.current += Math.PI / 6; // Rotate 30 degrees
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DECORATION_CHOICES.length);
    targetRotation.current -= Math.PI / 6; // Rotate -30 degrees
  };

  useEffect(() => {
    if (isAddingWish) {
      setCurrentIndex(0);
      targetRotation.current = 0;
      if (groupRef.current) {
        groupRef.current.rotation.y = 0;
      }
    }
  }, [isAddingWish]);

  if (!isAddingWish) return null;

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <group position={[0, 5, 5]}>
        {/* Carousel Container */}
        <group ref={groupRef}>
          {visibleDecorations.map((decoration, index) => {
            // Calculate position based on index
            const angle = ((index - 1) * Math.PI) / 3; // -60, 0, or 60 degrees
            const radius = index === 1 ? 0 : 2; // Middle item is closer
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius - (index === 1 ? 2 : 0); // Middle item is closer to camera

            return (
              <group key={index} position={[x, 0, z]}>
                <Bauble
                  id={decoration.label}
                  position={[0, 0, 0]}
                  color={decoration.color}
                  onClick={() => setSelectedBauble(decoration.label)}
                  scale={index === 1 ? 1.5 : 1} // Middle item is larger
                />
                <Text
                  position={[0, -0.5, 0]}
                  fontSize={0.2}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                >
                  {decoration.label}
                </Text>
              </group>
            );
          })}
        </group>

        {/* Navigation Buttons */}
        <Html position={[-2, 0, 0]}>
          <button
            onClick={handlePrevious}
            style={{
              background: "#4a5568",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: 0.8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            ←
          </button>
        </Html>

        <Html position={[2, 0, 0]}>
          <button
            onClick={handleNext}
            style={{
              background: "#4a5568",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: 0.8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            →
          </button>
        </Html>

        {/* Selected Bauble Info */}
        {selectedBauble && (
          <Center position={[0, -1.5, 0]}>
            <Text color="black" anchorX="center" anchorY="middle">
              Selected: {selectedBauble}
            </Text>
          </Center>
        )}
      </group>
    </>
  );
}

export default OrnamentsSelection;
