import * as THREE from "three";
import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const GingerHouse = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/ginger-house.glb") as any;

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
      <group name="Scene">
        <mesh
          name="Gingerbread_house"
          castShadow
          receiveShadow
          geometry={nodes.Gingerbread_house.geometry}
          material={materials["Gingerbread house"]}
          position={[0, 0.014, 0]}
          scale={0.001}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/ornaments/ginger-house.glb");
