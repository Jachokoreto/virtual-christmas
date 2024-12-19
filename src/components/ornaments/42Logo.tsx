import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const Logo = ({ position, normal, scale, onClick }: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/42Logo.glb") as any;

  const groupRef = useAlignToSurface(normal, position);

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
        castShadow
        receiveShadow
        geometry={nodes.polygon5.geometry}
        material={materials.SVGMat}
        position={[-0.507, 0, 0]}
        scale={10}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/42Logo.glb");
