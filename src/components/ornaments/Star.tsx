import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const Star = ({ position, normal, scale, onClick }: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/star.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateX: -0.3,
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
        geometry={nodes.Star001.geometry}
        material={materials.Star}
        position={[0.5, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/star.glb");
