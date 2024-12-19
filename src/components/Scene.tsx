import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
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
  CameraControls,
  Environment,
import useInteractionStore from "../store/interactionStore";
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { Room } from "./Room";
import { Fireplace } from "./Fireplace";
import { BearyChristmasEtien } from "./ornaments/BearyChristmasEtien";

export function Scene({
  decorations,
  onTreeClick,
  onDecorationClick,
}: {
  decorations: Decoration[];
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

  // useEffect(() => {
  //   if (cameraRef && cameraRef.current) {
  //     cameraRef.current.setTarget(0, 4.8, 0);
  //   }
  // }, []);

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
          onClick={handleAdjustedClick}
        />
        <Room position={[0, 0, 0]} scale={1.1} />
        <Fireplace position={[10.5, 0, -5]} scale={8.5} />

        {decorations.map((decoration) => (
          <group key={decoration.id}>
            {/* <SantaClaus
              id={decoration.id}
              scale={0.27}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerHouse
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Cone
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Sphere
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <Star
              id={decoration.id}
              scale={0.7}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksOne
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksTwo
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <SocksThree
              id={decoration.id}
              scale={1.6}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerTreeOne
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerTreeTwo
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <GingerSnowflakeOne
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            /> */}
            <GingerSnowflakeTwo
              id={decoration.id}
              scale={4}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            <BearyChristmasEtien
              id={decoration.id}
              scale={0.001}
              position={decoration.position}
              normal={decoration.normal}
              onClick={() => onDecorationClick(decoration)}
            />
            {/* <Html
				position={[
				  decoration.position[0] + 0.3, // Offset to the right
				  decoration.position[1],
				  decoration.position[2]
				]}
				center
				distanceFactor={8}
				occlude="blending"
				className="pointer-events-none"
				style={{
				  transition: 'all 0.2s',
				  opacity: visibleDecoration?.id === decoration.id ? 1 : 0,
				}}
			  >
				<div className="bg-white/90 p-3 rounded-lg shadow-lg backdrop-blur-sm min-w-[200px]">
				  <p className="text-sm text-gray-800">{decoration.message}</p>
				</div>
			  </Html> */}
          </group>
        ))}
      </group>
    </>
    // </Stage>
  );
}
