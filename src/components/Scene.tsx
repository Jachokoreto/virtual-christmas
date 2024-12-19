import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { ChristmasTree } from "../models/ChristmasTree";
import { SantaClaus } from "./ornaments/SantaClaus";
import { GingerHouse } from "./ornaments/GingerHouse";
import { Cone } from "./ornaments/Cone";
import { Sphere } from "./ornaments/Sphere";
import { Star } from "./ornaments/Star";
import { SocksOne } from "./ornaments/SocksOne";
import { SocksTwo } from "./ornaments/SocksTwo";
import { SocksThree } from "./ornaments/SocksThree";
import { GingerTreeOne } from "./ornaments/GingerTreeOne";
import { GingerTreeTwo } from "./ornaments/GingerTreeTwo";
import { GingerSnowflakeOne } from "./ornaments/GingerSnowflakeOne";
import { GingerSnowflakeTwo } from "./ornaments/GingerSnowflakeTwo";
import { Decoration } from "../types";
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { Room } from "./Room";
import { Fireplace } from "./Fireplace";
import { BearyChristmasEtien } from "./ornaments/BearyChristmasEtien";
import { ChristmasTreeEtien } from "./ornaments/ChristmasTreeEtien";
import { ChristmasTreeZlee } from "./ornaments/ChristmasTreeZlee";
import { PartyFishYelu } from "./ornaments/PartyFishYelu";
import { EvalMonsterJoloo } from "./ornaments/EvalMonsterJoloo";
import { Logo } from "./ornaments/42Logo";

export function Scene({
  decorations,
  addingDecoration,
  onTreeClick,
  onDecorationClick,
}: {
  decorations: Decoration[];
  addingDecoration: boolean;
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void;
  onDecorationClick: (decoration: Decoration) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const handleAdjustedClick = (event: ThreeEvent<MouseEvent>) => {
    if (!groupRef.current) return;

    // Get world matrix of the group
    const worldMatrix = groupRef.current.matrixWorld.clone();
    const inverseMatrix = worldMatrix.invert();

    // Clone the intersection point
    const point = event.point.clone();

    // Transform the point
    point.applyMatrix4(inverseMatrix);

    // Call the original click handler with the adjusted point
    onTreeClick({
      ...event,
      point,
    });
  };

  return (
    <>
      <OrbitControls
        target={[0, 4.8, 0]}
        autoRotate
        autoRotateSpeed={2}
        makeDefault
        minDistance={7} // Minimum zoom distance
        maxDistance={10} // Maximum zoom distance
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
      />
      `{" "}
      {/* <CameraControls
          ref={cameraRef}
          // minDistance={minDistance}
          // enabled={enabled}
          // verticalDragToForward={verticalDragToForward}
          // dollyToCursor={dollyToCursor}
          // infinityDolly={infinityDolly}
        />` */}
      <AccumulativeShadows
        temporal
        frames={100}
        color="#9d4b4b"
        colorBlend={0.5}
        alphaTest={0.9}
        scale={20}
      >
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
      </AccumulativeShadows>
      <directionalLight castShadow intensity={0.5} position={[5, 10, 7]} />
      <ambientLight intensity={0.6} />
      <Environment preset="apartment" />
      <group ref={groupRef}>
        {/* <OrnamentsSelection /> */}
        <ChristmasTree
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          addingDecoration={addingDecoration}
          onClick={handleAdjustedClick}
        />
        <Room position={[0, 0, 0]} scale={1.1} />
        <Fireplace position={[10.5, 0, -5]} scale={8.5} />

        {decorations.map((decoration) => {
          console.log(decoration);
          switch (decoration.type) {
            case "SantaClaus":
              return (
                <SantaClaus
                  id={decoration.id}
                  scale={0.35}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Ginger House":
              return (
                <GingerHouse
                  id={decoration.id}
                  scale={4.5}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Cone":
              return (
                <Cone
                  id={decoration.id}
                  scale={0.9}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Sphere":
              return (
                <Sphere
                  id={decoration.id}
                  scale={0.9}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Star":
              return (
                <Star
                  id={decoration.id}
                  scale={0.8}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Socks 1":
              return (
                <SocksOne
                  id={decoration.id}
                  scale={2.2}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Socks 2":
              return (
                <SocksTwo
                  id={decoration.id}
                  scale={2.2}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Socks 3":
              return (
                <SocksThree
                  id={decoration.id}
                  scale={2.2}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Ginger Tree One":
              return (
                <GingerTreeOne
                  id={decoration.id}
                  scale={4.8}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Ginger Tree Two":
              return (
                <GingerTreeTwo
                  id={decoration.id}
                  scale={4.8}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Ginger Snowflake One":
              return (
                <GingerSnowflakeOne
                  id={decoration.id}
                  scale={4.8}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Ginger Snowflake Two":
              return (
                <GingerSnowflakeTwo
                  id={decoration.id}
                  scale={4.8}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Beary Christmas":
              return (
                <BearyChristmasEtien
                  id={decoration.id}
                  scale={0.0024}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Christmas Tree 2":
              return (
                <ChristmasTreeEtien
                  id={decoration.id}
                  scale={0.0032}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Christmas Tree":
              return (
                <ChristmasTreeZlee
                  id={decoration.id}
                  scale={0.005}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Party Fish":
              return (
                <PartyFishYelu
                  id={decoration.id}
                  scale={0.0028}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "Eval Monster":
              return (
                <EvalMonsterJoloo
                  id={decoration.id}
                  scale={0.0025}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            case "42 Logo":
              return (
                <Logo
                  id={decoration.id}
                  scale={0.22}
                  position={decoration.position}
                  normal={decoration.normal}
                  onClick={() => onDecorationClick(decoration)}
                />
              );
            default:
              return null; // This will render nothing if no cases match
          }
        })}
      </group>
    </>
    // </Stage>
  );
}
