import { Sphere } from "@react-three/drei"
import { Decoration } from "../types"

interface BaubleProps {
    position: [number, number, number]
    color?: string
    id: string
}

export function Bauble({ position, color = "#ff0000", id }: BaubleProps) {
    return (
        <Sphere args={[0.1, 32, 32]} position={position}>
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Sphere>
    )
} 