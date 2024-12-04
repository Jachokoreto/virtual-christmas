import toast from "react-hot-toast";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Decoration } from './types'
import { ChristmasTree } from './models/ChristmasTree'
import * as THREE from 'three'
import { Bauble } from './components/Bauble'
import { ThreeEvent } from '@react-three/fiber'
import { subscribeToDecorations, addDecoration } from './firebase/decorationService'
import { WishModal } from './components/WishModal'

function Scene({
  decorations,
  onTreeClick,
}: {
  decorations: Decoration[];
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void;
}) {
  const [visibleDecoration, setVisibleDecoration] = useState<Decoration | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  const handleAdjustedClick = (event: ThreeEvent<MouseEvent>) => {
    if (!groupRef.current) return

    // Get world matrix of the group
    const worldMatrix = groupRef.current.matrixWorld.clone()
    const inverseMatrix = worldMatrix.invert()

    // Clone the intersection point
    const point = event.point.clone()

    // Transform the point
    point.applyMatrix4(inverseMatrix)

    // Call the original click handler with the adjusted point
    onTreeClick({
      ...event,
      point
    })
  }

  return (
    <Stage
      intensity={0.3}
      preset="soft"
      environment="lobby"
      adjustCamera={false}
    >
      <group ref={groupRef}>
        <ChristmasTree
          position={[0, 0, 0]}
          scale={[0.01, 0.01, 0.01]}
          onClick={handleAdjustedClick}
        />
        {decorations.map((decoration) => (
          <Bauble
            key={decoration.id}
            id={decoration.id}
            position={decoration.position}
            color={decoration.color}
            onVisible={() => setVisibleDecoration(decoration)}
            onHidden={() => setVisibleDecoration(null)}
          />
        ))}
      </group>
      {visibleDecoration && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '20px',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '300px',
            textAlign: 'center',
          }}
        >
          <p>{visibleDecoration.message}</p>
        </div>
      )}
    </Stage>
  )
}

function App() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isPlacingDecoration, setIsPlacingDecoration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDecoration, setPendingDecoration] = useState<{
    type: Decoration["type"];
    message: string;
    color: string;
  } | null>(null);

  // Subscribe to decoration updates
  useEffect(() => {
    const unsubscribe = subscribeToDecorations((updatedDecorations) => {
      console.log({ updatedDecorations })
      setDecorations(updatedDecorations);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddWish = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = (
    type: Decoration["type"],
    message: string,
    color: string
  ) => {
    setPendingDecoration({ type, message, color });
    setIsModalOpen(false);
    setIsPlacingDecoration(true);
  };

  const handleTreeClick = async (event: ThreeEvent<MouseEvent>) => {
    if (!isPlacingDecoration || !pendingDecoration) return;

    event.stopPropagation();
    const point = event.point;

    console.log({ point })

    try {
      await addDecoration({
        type: pendingDecoration.type,
        position: [point.x, point.y, point.z],
        color: pendingDecoration.color,
        message: pendingDecoration.message,
        createdAt: Date.now(),
      });
      // setDecorations([...decorations,
      // {
      //   id: `temp-${Date.now()}`,
      //   type: pendingDecoration.type,
      //   position: [point.x, point.y, point.z],
      //   color: pendingDecoration.color,
      //   message: pendingDecoration.message,
      //   createdAt: Date.now()
      // }
      // ])

      setIsPlacingDecoration(false);
      toast.success("decorations placed successfully!");
      setPendingDecoration(null);
    } catch (error) {
      console.error("Error adding decoration:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f0f0f0] flex flex-col relative">
      {/* Canvas container - now takes full width */}
      <div className="flex-1">
        <Canvas
          shadows
          dpr={[1, 2]}
          flat
          camera={{
            position: [0, 0, 10],
            fov: 40

          }}
        >
          <ambientLight intensity={0.6} />

          {/* <Stage intensity={0.3} preset="soft" environment="lobby" adjustCamera={false} c> */}
          <Scene decorations={decorations} onTreeClick={handleTreeClick} />
          {/* </Stage> */}

          <OrbitControls
            autoRotate
            autoRotateSpeed={2}
            makeDefault
            minDistance={9} // Minimum zoom distance
            maxDistance={12} // Maximum zoom distance
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {/* Bottom centered button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className={`
            px-8 py-4 rounded-full opacity-80 backdrop-blur-md border-4 border-white
            ${isPlacingDecoration
              ? 'bg-red-700 hover:bg-red-800'
              : 'bg-red-500 hover:bg-red-600'
            }
            text-white text-lg font-semibold
            transition-colors duration-200
            shadow-lg hover:shadow-xl
            flex items-center justify-center gap-2
          `}
          onClick={handleAddWish}
          disabled={isPlacingDecoration}
        >
          {isPlacingDecoration ? (
            <>
              <span className="animate-pulse w-[220px]">
                Click on tree to place
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Make a wish</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </>
          )
          }
        </button >
      </div >

      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div >
  )
}

export default App;
