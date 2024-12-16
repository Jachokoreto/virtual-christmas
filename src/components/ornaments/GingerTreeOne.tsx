import * as THREE from "three";
import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const GingerTreeOne = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/ginger-tree-1.glb") as any;

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && normal && position) {
      const surfaceNormal = new THREE.Vector3(...normal).normalize();
      const basePosition = new THREE.Vector3(...position);

      groupRef.current.position.copy(basePosition);

      const target = basePosition.clone().add(surfaceNormal);

      groupRef.current.lookAt(target);

      groupRef.current.rotateX(-Math.PI / 2);
      groupRef.current.translateY(-0.15);
      groupRef.current.translateX(0.05);
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
        geometry={nodes.Christmas_tree_1.geometry}
        material={materials["Material #0"]}
        position={[-0.025, 0.001, 0.01]}
        scale={0.001}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/ginger-tree-1.glb");
