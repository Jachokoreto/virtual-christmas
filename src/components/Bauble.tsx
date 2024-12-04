import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Sphere } from "@react-three/drei"
import { Decoration } from "../types"

interface BaubleProps {
    id: string
    position: [number, number, number]
    color: string
    onVisible?: () => void
    onHidden?: () => void
}

export function Bauble({ id, position, color, onVisible, onHidden }: BaubleProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const isVisible = useRef(false)

    useFrame(({ camera }) => {
        if (!meshRef.current) return

        // Get the vector from the camera to the bauble
        const baublePos = new Vector3(...position)
        const cameraDirection = new Vector3()
        camera.getWorldDirection(cameraDirection)

        // Calculate the dot product to determine if the bauble is in front of the camera
        const toBauble = baublePos.clone().sub(camera.position).normalize()
        const dotProduct = toBauble.dot(cameraDirection)

        // Check if the bauble is visible (in front of camera)
        const visible = dotProduct > 0.2 // Adjust this threshold as needed

        if (visible !== isVisible.current) {
            isVisible.current = visible
            if (visible) {
                onVisible?.()
            } else {
                onHidden?.()
            }
        }
    })

    return (
        <Sphere args={[0.1, 32, 32]} position={position}>
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Sphere>
    )
} 