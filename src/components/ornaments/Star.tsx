import * as THREE from "three";
import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const Star = ({ position, normal, scale, onClick }: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/star.glb") as any;

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && normal && position) {
      const surfaceNormal = new THREE.Vector3(...normal).normalize();
      const basePosition = new THREE.Vector3(...position);

      groupRef.current.position.copy(basePosition);

      const target = basePosition.clone().add(surfaceNormal);

      groupRef.current.lookAt(target);

      groupRef.current.rotateX(-Math.PI / 2);
      groupRef.current.translateX(-0.3);
    }
  }, [normal, position]);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      dispose={null}
      onClick={onClick}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Star001.geometry}
        material={materials.Star}
        position={[0.5, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/star.glb");
