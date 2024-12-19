import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const BearyChristmasEtien = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF(
    "/ornaments/beary-christmas-etien.glb"
  ) as any;

  const groupRef = useAlignToSurface(normal, position, {
    translateY: 0.01,
    translateZ: 0.1,
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
        geometry={nodes.Legs.geometry}
        material={materials.Legs}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arms.geometry}
        material={materials.Arms}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ears.geometry}
        material={materials.Ears}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(5)"].geometry}
        material={materials["Area (5)"]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Facial_features.geometry}
        material={materials["Facial features"]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Christmas_hat.geometry}
        material={materials["Christmas hat"]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(1)"].geometry}
        material={materials["Area (1)"]}
        rotation={[0, 1.5708, -1.5708]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Belly_(Inner)"].geometry}
        material={materials["Belly (Inner)"]}
        rotation={[0, 1.5708, -1.5708]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/beary-christmas-etien.glb");
