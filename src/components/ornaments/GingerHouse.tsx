import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const GingerHouse = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/ginger-house.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateY: -0.2,
  });

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
