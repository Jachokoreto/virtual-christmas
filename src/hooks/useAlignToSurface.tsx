import { useRef, useEffect } from "react";
import * as THREE from "three";

interface UseAlignToSurfaceOptions {
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
}

export function useAlignToSurface(
  normal?: [number, number, number],
  position?: [number, number, number],
  options: UseAlignToSurfaceOptions = {}
) {
  const groupRef = useRef<THREE.Group>(null);

  const {
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
  } = options;

  useEffect(() => {
    if (!groupRef.current || !normal || !position) return;

    const surfaceNormal = new THREE.Vector3(...normal).normalize();
    const basePosition = new THREE.Vector3(...position);

    // Position the group at the specified position
    groupRef.current.position.copy(basePosition);

    // Make the object look outward along the surface normal
    const target = basePosition.clone().add(surfaceNormal);
    groupRef.current.lookAt(target);

    // Apply additional rotations if needed, adjusting model orientation
    if (rotateX !== 0) groupRef.current.rotateX(rotateX);
    if (rotateY !== 0) groupRef.current.rotateY(rotateY);
    if (rotateZ !== 0) groupRef.current.rotateZ(rotateZ);

    // Translate along local axes after orientation is set
    if (translateX !== 0) groupRef.current.translateX(translateX);
    if (translateY !== 0) groupRef.current.translateY(translateY);
    if (translateZ !== 0) groupRef.current.translateZ(translateZ);

  }, [normal, position, rotateX, rotateY, rotateZ, translateX, translateY, translateZ]);

  return groupRef;
}
