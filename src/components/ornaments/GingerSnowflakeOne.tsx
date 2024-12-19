import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const GingerSnowflakeOne = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/ginger-snowflake-1.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateY: -0.1,
    translateZ: -0.05,
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
        geometry={nodes.Gingerbread_snowflake_1.geometry}
        material={materials["Gingerbread star_1"]}
        position={[-0.015, 0.034, 0]}
        rotation={[0, 0, 0]}
        scale={0.001}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/ginger-snowflake-1.glb");
