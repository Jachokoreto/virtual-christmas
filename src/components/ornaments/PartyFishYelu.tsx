import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const PartyFishYelu = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/party-fish-yelu.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateY: 1.5708,
    translateY: -0.18,
    translateX: 0.1,
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
        geometry={nodes.front_body.geometry}
        material={materials["front body"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fish_body.geometry}
        material={materials["fish body"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(1)"].geometry}
        material={materials["Area (1)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.left_eye.geometry}
        material={materials["left eye"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.right_eye.geometry}
        material={materials["right eye"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top_tail.geometry}
        material={materials["top tail"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottom_tail.geometry}
        material={materials["Bottom tail"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom_fin.geometry}
        material={materials["bottom fin"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top_fin.geometry}
        material={materials["top fin"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouth_right.geometry}
        material={materials["Mouth right"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouth_left.geometry}
        material={materials["Mouth left"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.left_hand.geometry}
        material={materials["left hand"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.right_hand.geometry}
        material={materials["right hand"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom_hat.geometry}
        material={materials["bottom hat"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hat.geometry}
        material={materials.hat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Area_(2)"].geometry}
        material={materials["Area (2)"]}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/party-fish-yelu.glb");
