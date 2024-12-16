import * as THREE from "three";
import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const SantaClaus = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/santa-claus.glb") as any;

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && normal && position) {
      const surfaceNormal = new THREE.Vector3(...normal).normalize();
      const basePosition = new THREE.Vector3(...position);

      groupRef.current.position.copy(basePosition);

      const target = basePosition.clone().add(surfaceNormal);

      groupRef.current.lookAt(target);

      groupRef.current.rotateX(-Math.PI / 2);
      groupRef.current.translateY(-0.2);
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
        geometry={nodes.Cube028.geometry}
        material={materials["Material.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_1.geometry}
        material={materials["Material.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_2.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_3.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_4.geometry}
        material={materials["Material.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_5.geometry}
        material={materials["Material.005"]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/santa-claus.glb");
