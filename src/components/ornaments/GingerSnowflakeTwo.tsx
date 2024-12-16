import * as THREE from "three";
import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const GingerSnowflakeTwo = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/ginger-snowflake-2.glb"
  ) as any;

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && normal && position) {
      const surfaceNormal = new THREE.Vector3(...normal).normalize();
      const basePosition = new THREE.Vector3(...position);

      groupRef.current.position.copy(basePosition);

      const target = basePosition.clone().add(surfaceNormal);

      groupRef.current.lookAt(target);

      groupRef.current.rotateX(-Math.PI / 2);
      groupRef.current.translateY(-0.1);
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
        geometry={nodes.Gingerbread_snowflake_2.geometry}
        material={materials["Material #2"]}
        position={[0.002, 0.037, -0.011]}
        scale={0.001}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/ginger-snowflake-2.glb");
