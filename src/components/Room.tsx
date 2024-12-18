import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export const Room = ({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) => {
  const { nodes, materials } = useGLTF("/furnitures/room.glb") as any;

  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position} scale={scale} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flower_001.geometry}
        material={materials["Material.018"]}
        position={[-9.904, 2.536, 1.317]}
        scale={2.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.008"]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.009"]}
        position={[-10.881, 15.348, -0.05]}
        rotation={[-Math.PI / 2, 0, -1.573]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.009"]}
        position={[11.339, 15.348, -0.05]}
        rotation={[-Math.PI / 2, 0, -1.573]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials["Material.009"]}
        position={[0.024, 15.348, -10.909]}
        rotation={[-1.571, 0, 3.141]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials["Material.009"]}
        position={[-0.022, 15.348, 11.311]}
        rotation={[-1.571, 0, 3.141]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials["Material.009"]}
        position={[0, 12.228, -0.091]}
        scale={5.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sofa_001.geometry}
        material={materials["Material.005"]}
        position={[0.001, 0.004, -8.951]}
        scale={3.499}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.coffee_table_001.geometry}
        material={materials["Material.010"]}
        position={[0.001, 0, -5.799]}
        scale={[2.97, 2.97, 2.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.musical_instrument_001.geometry}
        material={materials.Material}
        position={[0.051, 0, 9.768]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={4.032}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.training_item_001.geometry}
        material={materials["Material.012"]}
        position={[8.141, 0.038, 8.643]}
        rotation={[Math.PI, -Math.PI / 4, Math.PI]}
        scale={2.64}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.training_item_002.geometry}
        material={materials["Material.011"]}
        position={[9.878, 0, 7.037]}
        scale={2.4}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.camera_001.geometry}
        material={materials["Material.017"]}
        position={[-9.931, 2.531, 3.369]}
        rotation={[-Math.PI, 1.448, -Math.PI]}
        scale={3.055}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dresser_001.geometry}
        material={materials["Material.016"]}
        position={[-9.949, -0.022, 2.186]}
        rotation={[0, 1.571, 0]}
        scale={[3.5, 2.5, 2.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dumbbell_001.geometry}
        material={materials["Material.013"]}
        position={[6.144, 0.116, 10.083]}
        rotation={[0, 0.56, 0]}
        scale={2.2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dumbbell_002.geometry}
        material={materials["Material.014"]}
        position={[5.598, 0.116, 8.94]}
        rotation={[0, -0.159, 0]}
        scale={2.42}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lamp_002.geometry}
        material={materials["Material.006"]}
        position={[-5.699, 0.005, -8.3]}
        scale={3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lamp_002001.geometry}
        material={materials["Material.007"]}
        position={[-5.699, 0.005, -8.3]}
        scale={3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bookshelf_Insert_04.geometry}
        material={nodes.Bookshelf_Insert_04.material}
        position={[3.861, 2.833, -10.356]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.015}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bookshelf_Insert_02.geometry}
        material={nodes.Bookshelf_Insert_02.material}
        position={[3.887, 1.418, -10.379]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.015}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bookshelf_Insert_01.geometry}
        material={nodes.Bookshelf_Insert_01.material}
        position={[3.85, 0.191, -10.279]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.013}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bookshelf.geometry}
        material={materials["Material.019"]}
        position={[3.677, 0.027, -10.579]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.015}
      />
      <group
        position={[-8.081, 3.97, -10.48]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_1.geometry}
          material={materials.wire_028089177}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_2.geometry}
          material={materials.wire_006134006}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_3.geometry}
          material={materials.wire_134006006}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_4.geometry}
          material={materials.wire_134110008}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_5.geometry}
          material={materials.wire_229166215}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_6.geometry}
          material={materials.wire_087224198}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_7.geometry}
          material={materials.wire_143224087}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_8.geometry}
          material={materials.wire_224086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bookshelf_comment_9.geometry}
          material={materials.wire_224198087}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_01.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_01_copy.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_01_copy001.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_01_copy002.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_01_copy003.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_002.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_003.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_003.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_004.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_004.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_005.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_005.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_006.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_007.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_007.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover_008.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_008.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_009.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_010.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_011.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_012.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_013.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_014.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cover_015.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.metal_shelf.geometry}
        material={materials.wire_006135006}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page001.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page002.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page003.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page004.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_01.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_02.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_003.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_004.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_004.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_005.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_005.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_006.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_006.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_007.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_007.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_008.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_008.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_009.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_009.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_010.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_011.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_011.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Page_012.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.page_012.geometry}
        material={materials.wire_228184153}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vase_01.geometry}
        material={materials.wire_008110135}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vase_02.geometry}
        material={materials.wire_177028149}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vase_03.geometry}
        material={materials.wire_225198087}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vase_004.geometry}
        material={materials.wire_177028149}
        position={[-3.909, 0, 9.81]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fireplace.geometry}
        material={materials.fireplace}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.308}
      />
    </group>
  );
};

useGLTF.preload("/furnitures/room.glb");
