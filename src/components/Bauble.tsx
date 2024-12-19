import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh } from "three";
import { Sphere } from "@react-three/drei";

interface BaubleProps {
  id: string;
  position: [number, number, number];
  color?: string;
  onVisible?: () => void;
  onHidden?: () => void;
  onClick?: () => void;
  scale?: number;
}

export function Bauble({
  position,
  color = "#ff0000",
  onVisible,
  onHidden,
  onClick,
  scale = 1,
}: BaubleProps) {
  const meshRef = useRef<Mesh>(null);
  const isVisible = useRef(false);

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    // Get the vector from the camera to the bauble
    const baublePos = meshRef.current.getWorldPosition(new Vector3());
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // Calculate the dot product to determine if the bauble is in front of the camera
    const toBauble = baublePos.clone().sub(camera.position).normalize();
    const dotProduct = toBauble.dot(cameraDirection);

    // Check if the bauble is visible (in front of camera)
    const visible = dotProduct > 0.2;

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
      args={[0.2, 32, 32]}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      scale={scale}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </Sphere>
  );
}
