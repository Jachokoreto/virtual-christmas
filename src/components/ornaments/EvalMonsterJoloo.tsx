import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const EvalMonsterJoloo = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/eval-monster-joloo.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position);

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
        geometry={nodes["Area_(4)"].geometry}
        material={materials["Area (4)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(1)"].geometry}
        material={materials["Area (1).001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(2)"].geometry}
        material={materials["Area (2).001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(5)"].geometry}
        material={materials["Area (5)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(3)"].geometry}
        material={materials["Area (3)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(2)001"].geometry}
        material={materials["Area (2).002"]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/eval-monster-joloo.glb");
