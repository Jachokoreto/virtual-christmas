import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const GingerSnowflakeTwo = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/ginger-snowflake-2.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateY: -0.1,
  });

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
