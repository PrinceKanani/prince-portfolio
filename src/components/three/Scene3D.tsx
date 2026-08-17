import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Float } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useIsMobile, useReducedMotion } from '../../hooks/useMediaQuery'

/** Slowly drifting particle field. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const reduced = useReducedMotion()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (reduced || !ref.current) return
    ref.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#8b93f8" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/** Wireframe geometry drifting in the far background. */
function FloatingShapes({ mobile }: { mobile: boolean }) {
  const shapes = useMemo(
    () =>
      [
        { geo: 'icosahedron', pos: [-6.5, 2.5, -5], scale: 1.1, color: '#6366f1' },
        { geo: 'torus', pos: [6.8, -6, -6], scale: 1.3, color: '#22d3ee' },
        { geo: 'octahedron', pos: [5.5, 4, -7], scale: 0.9, color: '#a78bfa' },
        { geo: 'box', pos: [-5.8, -8, -5], scale: 0.8, color: '#6366f1' },
      ] as const,
    [],
  )

  return (
    <>
      {shapes.slice(0, mobile ? 2 : 4).map((s, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.7} floatIntensity={1.4}>
          <mesh position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale}>
            {s.geo === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
            {s.geo === 'torus' && <torusGeometry args={[1, 0.28, 10, 28]} />}
            {s.geo === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {s.geo === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
            <meshStandardMaterial color={s.color} wireframe transparent opacity={0.16} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

/**
 * The hero's central "digital product ecosystem": a glowing core sphere,
 * two tilted rings, and small orbiting nodes (projects / data / cloud).
 */
function HeroEcosystem({ mobile }: { mobile: boolean }) {
  const orbit = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()

  const nodes = useMemo(() => {
    const items: { angle: number; radius: number; y: number; size: number; color: string; kind: number }[] = []
    const colors = ['#22d3ee', '#a78bfa', '#818cf8', '#67e8f9', '#c4b5fd', '#93c5fd']
    const n = mobile ? 4 : 6
    for (let i = 0; i < n; i++) {
      items.push({
        angle: (i / n) * Math.PI * 2,
        radius: 2.35 + (i % 2) * 0.35,
        y: ((i % 3) - 1) * 0.45,
        size: 0.13 + (i % 3) * 0.035,
        color: colors[i % colors.length],
        kind: i % 3,
      })
    }
    return items
  }, [mobile])

  useFrame((state, delta) => {
    if (reduced) return
    if (orbit.current) orbit.current.rotation.y += delta * 0.25
    if (rings.current) {
      rings.current.rotation.z += delta * 0.1
      rings.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + 0.5
    }
  })

  const scale = mobile ? 0.62 : 1

  return (
    <group position={mobile ? [0, 2.1, -1] : [3.1, 0.3, 0]} scale={scale}>
      {/* Core */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.15, mobile ? 2 : 4]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4338ca"
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.6}
            wireframe
          />
        </mesh>
        <mesh scale={0.82}>
          <sphereGeometry args={[1, mobile ? 20 : 40, mobile ? 20 : 40]} />
          <meshStandardMaterial color="#312e81" emissive="#6366f1" emissiveIntensity={0.35} roughness={0.35} />
        </mesh>
      </Float>

      {/* Rings */}
      <group ref={rings} rotation={[0.5, 0, 0.2]}>
        <mesh>
          <torusGeometry args={[1.9, 0.015, 8, 80]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0.9, 0.4, 0]}>
          <torusGeometry args={[2.5, 0.01, 8, 80]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orbiting ecosystem nodes */}
      <group ref={orbit}>
        {nodes.map((n, i) => (
          <mesh
            key={i}
            position={[Math.cos(n.angle) * n.radius, n.y, Math.sin(n.angle) * n.radius]}
          >
            {n.kind === 0 && <boxGeometry args={[n.size * 1.6, n.size * 1.6, n.size * 1.6]} />}
            {n.kind === 1 && <sphereGeometry args={[n.size, 14, 14]} />}
            {n.kind === 2 && <octahedronGeometry args={[n.size * 1.3, 0]} />}
            <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/** Camera parallax from cursor + scene shift from scroll. */
function Rig() {
  const reduced = useReducedMotion()
  const pointer = useRef({ x: 0, y: 0 })

  useFrame(({ camera, scene }) => {
    if (reduced) return
    const p = pointer.current
    camera.position.x += (p.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (-p.y * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
    // Let the hero ecosystem drift upward and fade back as the page scrolls.
    const sc = window.scrollY / Math.max(window.innerHeight, 1)
    scene.position.y = sc * 3.2
    scene.position.z = -Math.min(sc * 1.4, 2.4)
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}

/**
 * Persistent full-page 3D background. One WebGL context for the particle
 * field, floating shapes and the hero's central ecosystem object.
 */
export default function Scene3D() {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  // The Rig pushes the scene up and back as the page scrolls, so a couple of
  // viewports down nothing of it is visible — stop the render loop there
  // instead of drawing invisible pixels at 60fps for the whole session.
  const [offscreen, setOffscreen] = useState(false)

  useEffect(() => {
    let raf = 0
    let queued = false
    const compute = () => {
      queued = false
      setOffscreen(window.scrollY > window.innerHeight * 2.5)
    }
    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, mobile ? 1.3 : 1.75]}
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        frameloop={reduced || offscreen ? 'demand' : 'always'}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#c7d2fe" />
        <pointLight position={[-6, -4, 2]} intensity={0.6} color="#22d3ee" />
        <Particles count={mobile ? 220 : 620} />
        <FloatingShapes mobile={mobile} />
        <HeroEcosystem mobile={mobile} />
        <Rig />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
