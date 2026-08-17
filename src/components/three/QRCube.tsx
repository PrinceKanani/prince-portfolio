import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useMediaQuery'

/** Deterministic pseudo-random generator so the QR pattern is stable. */
function lcg(seed: number) {
  let s = seed
  return () => {
    s = (s * 48271) % 2147483647
    return s / 2147483647
  }
}

function makeQRTexture(): THREE.CanvasTexture {
  const size = 256
  const cells = 21
  const cell = size / cells
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0b0e18'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#a5b4fc'
  const rand = lcg(20260817)
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if (rand() > 0.55) ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2)
    }
  }
  // Finder squares in three corners, like a real QR code.
  const finder = (fx: number, fy: number) => {
    ctx.fillStyle = '#0b0e18'
    ctx.fillRect(fx, fy, cell * 7, cell * 7)
    ctx.fillStyle = '#c7d2fe'
    ctx.fillRect(fx, fy, cell * 7, cell * 7)
    ctx.fillStyle = '#0b0e18'
    ctx.fillRect(fx + cell, fy + cell, cell * 5, cell * 5)
    ctx.fillStyle = '#c7d2fe'
    ctx.fillRect(fx + cell * 2, fy + cell * 2, cell * 3, cell * 3)
  }
  finder(0, 0)
  finder(size - cell * 7, 0)
  finder(0, size - cell * 7)
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  // Canvas 2D pixels are sRGB; untagged, the renderer treats them as linear
  // and re-encodes on output, washing the near-black background to mid gray.
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function Cube({ scanning }: { scanning: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const reduced = useReducedMotion()
  const texture = useMemo(makeQRTexture, [])

  // R3F only auto-disposes JSX-declared objects; this imperatively created
  // texture must be freed explicitly or its GPU copy leaks on unmount.
  useEffect(() => () => texture.dispose(), [texture])

  useFrame((_, delta) => {
    if (reduced || !mesh.current) return
    mesh.current.rotation.y += delta * (scanning ? 1.2 : 0.35)
    mesh.current.rotation.x += delta * 0.12
  })

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} rotation={[0.3, 0.6, 0]}>
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshStandardMaterial map={texture} emissive="#4338ca" emissiveIntensity={scanning ? 0.5 : 0.22} roughness={0.35} metalness={0.4} />
      </mesh>
    </Float>
  )
}

interface QRCubeProps {
  scanning: boolean
  /** Stops the render loop while the section is off-screen. */
  paused?: boolean
}

/** Rotating 3D cube textured with a QR-style pattern; speeds up while "scanning". */
export default function QRCube({ scanning, paused = false }: QRCubeProps) {
  const reduced = useReducedMotion()
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      frameloop={reduced || paused ? 'demand' : 'always'}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#c7d2fe" />
      <pointLight position={[-4, -2, 3]} intensity={0.6} color="#22d3ee" />
      <Cube scanning={scanning} />
    </Canvas>
  )
}
