import { OrnamentProps } from "./OrnamentProps";
import { useGLTF } from "@react-three/drei";
import { useAlignToSurface } from "../../hooks/useAlignToSurface";

export const SocksTwo = ({
  position,
  normal,
  scale,
  onClick,
}: OrnamentProps) => {
  const { nodes, materials } = useGLTF("/ornaments/socks-2.glb") as any;

  const groupRef = useAlignToSurface(normal, position, {
    rotateX: -Math.PI / 2,
    translateY: 0.2,
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
        geometry={nodes["norvedem-sock"].geometry}
        material={materials.sock4}
      />
    </group>
  );
};

useGLTF.preload("/ornaments/socks-2.glb");
