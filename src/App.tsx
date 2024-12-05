import toast from "react-hot-toast";
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Stage } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Decoration } from './types'
import { ChristmasTree } from './models/ChristmasTree'
import * as THREE from 'three'
import { Bauble } from './components/Bauble'
import { ThreeEvent } from '@react-three/fiber'
import { subscribeToDecorations, addDecoration } from './firebase/decorationService'
import { WishModal } from './components/WishModal'
import { MessageModal } from './components/MessageModal'

function Scene({
  decorations,
  onTreeClick,
  onBaubleClick,
}: {
  decorations: Decoration[];
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void;
  onBaubleClick: (decoration: Decoration) => void;
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

  useEffect(() => {
    console.log(visibleDecoration);
  }, [visibleDecoration])

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
          <group key={decoration.id}>
            <Bauble
              id={decoration.id}
              position={decoration.position}
              color={decoration.color}
              onVisible={() => setVisibleDecoration(decoration)}
              onHidden={() => setVisibleDecoration(null)}
              onClick={() => onBaubleClick(decoration)}
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
    </Stage>
  )
}

function App() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isPlacingDecoration, setIsPlacingDecoration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecoration, setSelectedDecoration] = useState<Decoration | null>(null);
  const [pendingDecoration, setPendingDecoration] = useState<{
    type: Decoration["type"];
    message: string;
    color: string;
    name: string;
  } | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth > 768);

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
    color: string,
    name: string
  ) => {
    setPendingDecoration({ type, message, color, name });
    setIsModalOpen(false);
    setIsPlacingDecoration(true);
  };

  const handleTreeClick = async (event: ThreeEvent<MouseEvent>) => {
    if (!isPlacingDecoration || !pendingDecoration) return;

    event.stopPropagation();
    const point = event.point;

    try {
      await addDecoration({
        type: pendingDecoration.type,
        position: [point.x, point.y, point.z],
        color: pendingDecoration.color,
        message: pendingDecoration.message,
        name: pendingDecoration.name,
        createdAt: Date.now(),
      });

      setIsPlacingDecoration(false);
      toast.success("Wish placed successfully!");
      setPendingDecoration(null);
    } catch (error) {
      console.error("Error adding decoration:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f0f0f0] flex flex-col relative">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg"
      >
        {isPanelOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Side Panel with responsive classes */}
      <div className={`
        fixed top-0 h-full w-80 bg-white/80 backdrop-blur-md shadow-lg overflow-y-auto
        transition-transform duration-300 ease-in-out z-40
        md:translate-x-0
        ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Wishes</h2>
          <div className="space-y-4">
            {decorations
              .filter(deco => deco.message != "")
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((decoration) => (
                <div
                  key={decoration.id}
                  className="p-4 rounded-lg bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderLeft: `4px solid ${decoration.color}` }}
                >
                  <p className="text-gray-800">{decoration.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-gray-600">
                      - {decoration.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(decoration.createdAt).toLocaleDateString()}
                      {' '}
                      {new Date(decoration.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Canvas container with responsive margin */}
      <div className={`
        flex-1 relative z-0
        transition-[margin] duration-300 ease-in-out
        md:ml-80
        ${isPanelOpen ? 'ml-80' : 'ml-0'}
      `}>
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
          <Scene decorations={decorations} onTreeClick={handleTreeClick} onBaubleClick={(decoration) => setSelectedDecoration(decoration)} />
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

      {/* Add higher z-index to MessageModal */}
      <div className="z-50">
        <MessageModal
          isOpen={selectedDecoration !== null}
          onClose={() => setSelectedDecoration(null)}
          message={selectedDecoration?.message || ''}
        />
      </div>

      {/* Add higher z-index to bottom button container */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
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

      {/* Add higher z-index to WishModal */}
      <div className="z-50">
        <WishModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      </div>
    </div >
  )
}

export default App;
