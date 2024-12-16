import toast from 'react-hot-toast'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, View } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Decoration } from './types'
import { ChristmasTree } from './models/ChristmasTree'
import * as THREE from 'three'
import { Bauble } from './components/Bauble'
import { ThreeEvent } from '@react-three/fiber'
import {
  subscribeToDecorations,
  addDecoration,
} from './firebase/decorationService'
import { WishModal } from './components/WishModal'
import { MessageModal } from './components/MessageModal'

function Scene({
  decorations,
  onTreeClick,
  onBaubleClick,
}: {
  decorations: Decoration[]
  onTreeClick: (event: ThreeEvent<MouseEvent>) => void
  onBaubleClick: (decoration: Decoration) => void
}) {
  const [visibleDecoration, setVisibleDecoration] = useState<Decoration | null>(
    null
  )
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
      point,
    })
  }

  useEffect(() => {
    console.log(visibleDecoration)
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
  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [isPlacingDecoration, setIsPlacingDecoration] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDecoration, setSelectedDecoration] =
    useState<Decoration | null>(null)
  const [pendingDecoration, setPendingDecoration] = useState<{
    type: Decoration['type']
    message: string
    color: string
    name: string
  } | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth > 768)
  const [views, setViews] = useState<Record<string, HTMLDivElement>>({})
  const ref = useRef<HTMLDivElement>(null)

  // Subscribe to decoration updates
  useEffect(() => {
    const unsubscribe = subscribeToDecorations((updatedDecorations) => {
      console.log({ updatedDecorations })
      setDecorations(updatedDecorations)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleAddWish = () => {
    setIsModalOpen(true)
  }

  const handleModalConfirm = (
    type: Decoration['type'],
    message: string,
    color: string,
    name: string
  ) => {
    setPendingDecoration({ type, message, color, name })
    setIsModalOpen(false)
    setIsPlacingDecoration(true)
  }

  const handleTreeClick = async (event: ThreeEvent<MouseEvent>) => {
    if (!isPlacingDecoration || !pendingDecoration) return

    event.stopPropagation()
    const point = event.point

    try {
      await addDecoration({
        type: pendingDecoration.type,
        position: [point.x, point.y, point.z],
        color: pendingDecoration.color,
        message: pendingDecoration.message,
        name: pendingDecoration.name,
        createdAt: Date.now(),
      })

      setIsPlacingDecoration(false)
      toast.success('Wish placed successfully!')
      setPendingDecoration(null)
    } catch (error) {
      console.error('Error adding decoration:', error)
    }
  }

  const handleExportData = () => {
    // Prepare the data with only necessary fields
    const exportData = decorations.map((decoration) => ({
      message: decoration.message,
      name: decoration.name,
      color: decoration.color,
      createdAt: new Date(decoration.createdAt).toLocaleString(),
    }))

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wishes-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-[#f0f0f0]"
      ref={ref}
    >
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm md:hidden"
      >
        {isPanelOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Side Panel with responsive classes */}
      <div
        className={`fixed top-0 z-40 h-full w-80 overflow-y-auto bg-white/80 shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out md:translate-x-0 ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Wishes</h2>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Data
            </button>
          </div>
          <div className="space-y-4">
            {decorations
              .filter((deco) => deco.message != '')
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((decoration) => (
                <div
                  key={decoration.id}
                  className="rounded-lg bg-white/80 p-4 shadow-sm transition-shadow hover:shadow-md"
                  style={{ borderLeft: `4px solid ${decoration.color}` }}
                >
                  <p className="text-gray-800">{decoration.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600">
                      - {decoration.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(decoration.createdAt).toLocaleDateString()}{' '}
                      {new Date(decoration.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Canvas container with responsive margin */}
      <div
        className={`relative z-0 flex-1 transition-[margin] duration-300 ease-in-out md:ml-80 ${isPanelOpen ? 'ml-80' : 'ml-0'} `}
      >
        <View className="h-full w-full">
          <ambientLight intensity={0.6} />

          {/* <Stage intensity={0.3} preset="soft" environment="lobby" adjustCamera={false} c> */}
          <Scene
            decorations={decorations}
            onTreeClick={handleTreeClick}
            onBaubleClick={(decoration) => setSelectedDecoration(decoration)}
          />
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
        </View>
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
      <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
        <button
          className={`rounded-full border-4 border-white px-8 py-4 opacity-80 backdrop-blur-md ${
            isPlacingDecoration
              ? 'bg-red-700 hover:bg-red-800'
              : 'bg-red-500 hover:bg-red-600'
          } flex items-center justify-center gap-2 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:shadow-xl`}
          onClick={handleAddWish}
          disabled={isPlacingDecoration}
        >
          {isPlacingDecoration ? (
            <>
              <span className="w-[220px] animate-pulse">
                Click on tree to place
              </span>
              <svg
                className="h-5 w-5"
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
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Add higher z-index to WishModal */}
      <div className="z-50">
        <WishModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
          views={views}
          setViews={setViews}
        />
      </div>
      <Canvas
        eventSource={ref}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
        }}
        // shadows
        // dpr={[1, 2]}
        // flat
        // camera={{
        //   position: [0, 0, 10],
        //   fov: 40
        // }}
      >
        <View.Port />
      </Canvas>
    </div>
  )
}

export default App
