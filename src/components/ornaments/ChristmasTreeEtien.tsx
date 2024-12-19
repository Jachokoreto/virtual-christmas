import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const ChristmasTreeEtien = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/christmas-tree-etien.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position, {
    translateY: 0.2,
    translateZ: 0.05,
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
        material={materials["Area (1).002"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blob.geometry}
        material={materials.blob}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["blob_(3)"].geometry}
        material={materials["blob (3)"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["blob_(6)"].geometry}
        material={materials["blob (6)"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["blob_(8)"].geometry}
        material={materials["blob (8)"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(3)"].geometry}
        material={materials["Area (3).001"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(2)"].geometry}
        material={materials["Area (2).003"]}
        position={[-14.6, 0, 21]}
        rotation={[0, 1.5708, -1.5708]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/christmas-tree-etien.glb");
