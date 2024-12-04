/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeEvent } from '@react-three/fiber'

type GLTFResult = GLTF & {
    nodes: {
        ['Area_(1)']: THREE.Mesh
        ['Area_(2)']: THREE.Mesh
        ['Area_(3)']: THREE.Mesh
        ['Area_(4)']: THREE.Mesh
        ['Area_(5)']: THREE.Mesh
        ['Area_(6)']: THREE.Mesh
        ['Area_(7)']: THREE.Mesh
    }
    materials: {
        ['Area (1)']: THREE.MeshPhysicalMaterial
        ['Area (2)']: THREE.MeshPhysicalMaterial
        ['Area (3)']: THREE.MeshPhysicalMaterial
        ['Area (4)']: THREE.MeshPhysicalMaterial
        ['Area (5)']: THREE.MeshPhysicalMaterial
        ['Area (6)']: THREE.MeshPhysicalMaterial
        ['Area (7)']: THREE.MeshPhysicalMaterial
    }
}

interface ChristmasTreeProps {
    position: [number, number, number]
    scale: [number, number, number]
    onClick: (event: ThreeEvent<MouseEvent>, point: THREE.Vector3) => void
}

export function ChristmasTree({ position, scale, onClick }: ChristmasTreeProps) {
    const { nodes, materials } = useGLTF('/christmas-tree/24_12_04_10_42_59_802.gltf') as GLTFResult

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()

        const point = event.point.clone()

        onClick(event, point)
    }

    return (
        <group
            position={position}
            scale={scale}
            onClick={handleClick}
            dispose={null}
        >

            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(1)'].geometry}
                material={materials['Area (1)']}
            >
                {/* <Sparkles count={50} scale={0.2 * 2} size={6} speed={0.4} /> */}

            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(2)'].geometry}
                material={materials['Area (2)']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(3)'].geometry}
                material={materials['Area (3)']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(4)'].geometry}
                material={materials['Area (4)']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(5)'].geometry}
                material={materials['Area (5)']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(6)'].geometry}
                material={materials['Area (6)']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Area_(7)'].geometry}
                material={materials['Area (7)']}
            />
        </group>
    )
}

useGLTF.preload('/models/24_11_29_18_38_51_838.gltf')
