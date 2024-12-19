import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Mesh } from "three";
import { Sphere } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useGesture } from "@use-gesture/react";

interface BaubleTempProps {
  id: string;
  position: [number, number, number];
  color?: string;
  onVisible?: () => void;
  onHidden?: () => void;
  onClick?: () => void;
}

export function BaubleTemp({
  position,
  color = "#ff0000",
  onVisible,
  onHidden,
  onClick,
}: BaubleTempProps) {
  const meshRef = useRef<Mesh>(null);
  const isVisible = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const { camera, size } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.2],
    material: {
      friction: 0.1,
      restitution: 0.8,
    },
  }));

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    // Get the vector from the camera to the bauble
    const baublePos = meshRef.current.getWorldPosition(new Vector3());
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // Calculate the dot product to determine if the bauble is in front of the camera
    const toBaubleTemp = baublePos.clone().sub(camera.position).normalize();
    const dotProduct = toBaubleTemp.dot(cameraDirection);

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

  const bind = useGesture({
    onDrag: ({ active, movement: [x, y], event }) => {
      event.stopPropagation();
      setIsDragging(active);

      if (active) {
        // Convert screen coordinates to world coordinates
        const vector = new Vector3();
        vector.set((x / size.width) * 2, -(y / size.height) * 2, 0);
        vector.unproject(camera);

        // Apply velocity to move the bauble
        api.velocity.set(
          vector.x * 2,
          Math.max(vector.y * 2, 0), // Prevent going below ground
          vector.z * 2
        );
      }
    },
    onClick: (event) => {
      if (!isDragging && onClick) {
        event.stopPropagation();
        onClick();
      }
    },
  });

  return (
    <Sphere ref={ref} args={[0.2, 32, 32]} {...bind()}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={isDragging ? color : "#000000"}
        emissiveIntensity={isDragging ? 0.5 : 0}
      />
    </Sphere>
  );
}
