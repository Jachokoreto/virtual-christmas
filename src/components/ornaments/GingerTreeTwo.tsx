import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const GingerTreeTwo = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/ginger-tree-2.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateY: -0.15,
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
        geometry={nodes.Christmas_tree_2.geometry}
        material={materials["Material #0.001"]}
        position={[-0.001, 0.001, 0]}
        scale={0.001}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/ginger-tree-2.glb");
