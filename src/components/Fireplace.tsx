import { useGLTF } from "@react-three/drei";

export const Fireplace = ({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) => {
  const { nodes, materials } = useGLTF("/furnitures/fireplace.glb") as any;

  return (
    <group position={position} scale={scale} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fireplace.geometry}
        material={materials.fireplace}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.308}
      />
    </group>
  );
};

useGLTF.preload("/furnitures/fireplace.glb");
