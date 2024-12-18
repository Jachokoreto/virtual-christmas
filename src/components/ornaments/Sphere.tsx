import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const Sphere = ({ position, normal, scale, onClick }: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/sphere.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateX: 0.4,
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
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.001"]}
        position={[-0.5, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/sphere.glb");
