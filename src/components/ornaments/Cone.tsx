import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const Cone = ({ position, normal, scale, onClick }: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/cone.glb") as any;

  const groupRef = useAlignToSurface(normal, position, { rotateX: -1.5708 });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      dispose={null}
      onClick={onClick}
      castShadow
    >
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Toy001.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/cone.glb");
