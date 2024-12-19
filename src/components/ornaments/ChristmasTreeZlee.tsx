import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const ChristmasTreeZlee = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/christmas-tree-zlee.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position, {
    translateZ: 0.1,
    translateY: 0.05,
    rotateZ: -1.5708,
    rotateX: 0.2,
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
        geometry={nodes["Area_(1)"].geometry}
        material={materials["Area (1).003"]}
        position={[-18.5, 0, -6]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["-JMuOmlW"].geometry}
        material={materials["-JMuOmlW"]}
        position={[-18.5, 0, -6]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(2)"].geometry}
        material={materials["Area (2).004"]}
        position={[-18.5, 0, -6]}
        rotation={[0, 1.5708, -1.5708]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/christmas-tree-zlee.glb");
