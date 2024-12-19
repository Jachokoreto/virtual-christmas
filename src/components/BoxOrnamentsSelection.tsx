import { useState } from "react";
import { Center, PerspectiveCamera, Text } from "@react-three/drei";
import { Bauble } from "./Bauble";
import useInteractionStore from "../store/interactionStore";
import { Physics } from "@react-three/cannon";

const DECORATION_CHOICES = [
  { type: "bauble", label: "Red Bauble", color: "#ff0000" },
  { type: "bauble", label: "Blue Bauble", color: "#0000ff" },
  { type: "bauble", label: "Green Bauble", color: "#00ff00" },
  { type: "bauble", label: "Gold Bauble", color: "#ffd700" },
  { type: "bauble", label: "Silver Bauble", color: "#c0c0c0" },
  { type: "bauble", label: "Purple Bauble", color: "#800080" },
  { type: "bauble", label: "Pink Bauble", color: "#ff69b4" },
];

function OrnamentsSelection() {
  const [selectedBauble, setSelectedBauble] = useState(null);
  const { setIsAddingWish, isAddingWish } = useInteractionStore();

  if (!isAddingWish) return null;

  return (
    <group position={[0, 0, 2]}>
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={25} />

      <Physics
        gravity={[0, -9.81, 0]}
        defaultContactMaterial={{ restitution: 0.5 }}
      >
        {/* Container Box */}
        <group>
          {/* Bottom */}
          <Plane position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} />

          {/* Walls */}
          <Plane position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          <Plane position={[2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
          <Plane position={[0, 0, -2]} rotation={[0, 0, 0]} />
        </group>

        {/* Baubles with Physics */}
        {DECORATION_CHOICES.map((choice, index) => (
          <Bauble
            key={choice.color}
            position={[
              Math.random() * 2 - 1,
              2 + Math.random() * 2,
              Math.random() * 2 - 1,
            ]}
            id={choice.label}
            color={choice.color}
            onClick={() => setSelectedBauble(choice.label)}
          />
        ))}
      </Physics>

      {/* Selected Bauble Info */}
      {selectedBauble && (
        <Center position={[0, -3, 0]}>
          <Text color="black" anchorX="center" anchorY="middle">
            Selected: {selectedBauble}
          </Text>
        </Center>
      )}
    </group>
  );
}

// Plane component for the container walls
function Plane({ position, rotation }) {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    rotation,
    args: [4, 4, 0.2],
  }));

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={[4, 4, 0.2]} />
      <meshStandardMaterial color="#666666" transparent opacity={0.3} />
    </mesh>
  );
}

export default OrnamentsSelection;
