import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh } from "three";
import { Sphere } from "@react-three/drei";

interface BaubleProps {
  id: string;
  position: [number, number, number];
  onVisible?: () => void;
  onHidden?: () => void;
  onClick?: () => void;
}

export function Bauble({
  position,
  onVisible,
  onHidden,
  onClick,
}: BaubleProps) {
  const meshRef = useRef<Mesh>(null);
  const isVisible = useRef(false);

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    // Get the vector from the camera to the bauble
    const baublePos = new Vector3(...position);
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // Calculate the dot product to determine if the bauble is in front of the camera
    const toBauble = baublePos.clone().sub(camera.position).normalize();
    const dotProduct = toBauble.dot(cameraDirection);

    // Check if the bauble is visible (in front of camera)
    const visible = dotProduct > 0.2; // Adjust this threshold as needed

    if (visible !== isVisible.current) {
      isVisible.current = visible;
      if (visible) {
        onVisible?.();
      } else {
        onHidden?.();
      }
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.1, 32, 32]}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <meshStandardMaterial metalness={0.8} roughness={0.2} />
    </Sphere>
  );
}
