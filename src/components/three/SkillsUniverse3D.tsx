import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line, OrbitControls } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { universeNodes } from '../../data/skills'
import { siteConfig } from '../../config/siteConfig'
import { useIsMobile, useIsTouchDevice, useReducedMotion } from '../../hooks/useMediaQuery'

interface UniverseProps {
  onSelect: (categoryId: string, label: string) => void
  /** Label of the selected node — per node, so shared categoryIds don't light up together. */
  selectedNode: string | null
}

/**
 * Distributes points on a sphere using the golden-angle spiral.
 * Vertically squashed so labels spread wide instead of stacking on top of
 * each other (and on the hint text at the bottom of the canvas).
 * The vertical band is clamped to ±0.7 — a point at a pole sits on the Y
 * rotation axis and would not move at all while the sphere spins (the first
 * and last nodes looked "frozen" without this).
 */
function spherePositions(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = (1 - (i / Math.max(count - 1, 1)) * 2) * 0.7
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius * 0.6, Math.sin(theta) * r * radius))
  }
  return points
}

/** Radius of the visual core (wireframe shell + glow) that should hide labels passing behind it. */
const CORE_OCCLUSION_RADIUS = 1.05

function Universe({ onSelect, selectedNode }: UniverseProps) {
  const group = useRef<THREE.Group>(null)
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [hovered, setHovered] = useState<number | null>(null)

  const positions = useMemo(() => spherePositions(universeNodes.length, 3.05), [])
  // Scratch vectors reused every frame to avoid per-frame allocations.
  const scratch = useMemo(
    () => ({
      world: new THREE.Vector3(),
      toNode: new THREE.Vector3(),
      toCenter: new THREE.Vector3(),
      center: new THREE.Vector3(),
      cross: new THREE.Vector3(),
    }),
    [],
  )

  useFrame(({ camera }, delta) => {
    if (!group.current) return
    if (!reduced) group.current.rotation.y += delta * (hovered !== null ? 0.02 : 0.08)

    /*
     * Label visibility, computed in camera space so it stays correct while the
     * visitor drags to orbit (not just during auto-rotation):
     *  - a label whose node is BEHIND the core sphere's silhouette fades out
     *    completely (and stops catching pointer events);
     *  - other back-half labels dim to 35% so front labels always win overlaps;
     *  - front-half labels are fully opaque. All transitions are CSS-eased.
     */
    group.current.getWorldPosition(scratch.center)
    scratch.toCenter.copy(scratch.center).sub(camera.position)
    const centerDist = scratch.toCenter.length()

    positions.forEach((p, i) => {
      const el = labelRefs.current[i]
      if (!el) return
      scratch.world.copy(p).applyMatrix4(group.current!.matrixWorld)
      scratch.toNode.copy(scratch.world).sub(camera.position)
      const nodeDist = scratch.toNode.length()
      const behind = nodeDist > centerDist
      // Perpendicular distance from the node to the camera→center sight line:
      // inside the core radius while behind ⇒ the sphere blocks it.
      const perpendicular = scratch.cross.copy(scratch.toNode).cross(scratch.toCenter).length() / centerDist
      const blocked = behind && perpendicular < CORE_OCCLUSION_RADIUS

      // On small screens dimmed back-half chips are clutter, so hide them fully.
      const backOpacity = mobile ? '0' : '0.35'
      const hidden = blocked || (mobile && behind)
      const opacity = hidden ? '0' : hovered === i || !behind ? '1' : backOpacity
      if (el.style.opacity !== opacity) {
        el.style.opacity = opacity
        // Explicit 'auto' (not ''): the drei Html wrapper is pointer-events:none,
        // so the button must re-enable itself to stay clickable when visible.
        el.style.pointerEvents = hidden ? 'none' : 'auto'
        // Keep keyboard focus off invisible chips.
        el.tabIndex = hidden ? -1 : 0
      }
    })
  })

  return (
    <group ref={group}>
      {/* Central identity node */}
      <mesh>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh scale={0.65}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#312e81" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      {/* The name sits on the dark core sphere, so white works in both themes.
          The wrapper is pointer-events:none — drei's Html wrapper div is
          otherwise hit-testable and would create a click-dead zone at center. */}
      <Html center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <span className="pointer-events-none font-display text-sm font-bold tracking-[0.3em] text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.9)]">
          {siteConfig.name.split(' ')[0].toUpperCase()}
        </span>
      </Html>

      {/* Skill nodes connected to the center */}
      {universeNodes.map((node, i) => {
        const pos = positions[i]
        const active = hovered === i || selectedNode === node.label
        return (
          <group key={node.label}>
            <Line
              points={[[0, 0, 0], pos.toArray()]}
              color={active ? '#22d3ee' : '#6366f1'}
              transparent
              opacity={active ? 0.85 : 0.28}
              lineWidth={1}
            />
            <mesh
              position={pos}
              // Scale, not geometry args: changing args makes R3F rebuild the
              // BufferGeometry on every hover in/out.
              scale={active ? 1.3 : 1}
              onPointerOver={() => setHovered(i)}
              onPointerOut={() => setHovered(null)}
              onClick={() => onSelect(node.categoryId, node.label)}
            >
              <sphereGeometry args={[0.13, 18, 18]} />
              <meshStandardMaterial
                color={active ? '#22d3ee' : '#818cf8'}
                emissive={active ? '#22d3ee' : '#6366f1'}
                emissiveIntensity={active ? 1 : 0.5}
              />
            </mesh>
            {/*
              No distanceFactor: labels keep one fixed size instead of ballooning
              or shrinking with orbit depth. Visibility (hide-behind-sphere +
              depth fade) is driven per-frame in camera space above; alternating
              above/below placement keeps neighbouring chips from stacking.
              Theme tokens (glass/ink/cyan) keep the chips readable in light mode.
            */}
            {/* Wrapper pointer-events:none — every chip resolves to the same
                z-index (zIndexRange maps over camera.near..far), so a hidden
                chip's wrapper could otherwise sit above a visible chip and
                swallow its clicks. Buttons re-enable themselves when visible. */}
            <Html position={pos.toArray()} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
              <button
                ref={(el) => {
                  labelRefs.current[i] = el
                }}
                onClick={() => onSelect(node.categoryId, node.label)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ marginTop: i % 2 === 0 ? 30 : -38 }}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap shadow-sm backdrop-blur-md transition-[color,border-color,background-color,opacity] duration-300 ${
                  active
                    ? 'border-cyan/70 bg-cyan/15 text-cyan'
                    : 'glass-strong text-ink hover:border-accent/50'
                }`}
              >
                {node.label}
              </button>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

interface SkillsUniverse3DProps {
  onSelect: (categoryId: string, label: string) => void
  selectedNode: string | null
  /** Stops the render loop while the section is off-screen. */
  paused?: boolean
}

/** Interactive 3D constellation of skill areas. Clicking a node opens the category detail. */
export default function SkillsUniverse3D({ onSelect, selectedNode, paused = false }: SkillsUniverse3DProps) {
  const mobile = useIsMobile()
  const touch = useIsTouchDevice()
  const reduced = useReducedMotion()

  return (
    <Canvas
      dpr={[1, mobile ? 1.3 : 1.75]}
      camera={{ position: [0, 0.45, mobile ? 9.2 : 7.6], fov: 45 }}
      frameloop={reduced || paused ? 'demand' : 'always'}
      gl={{ antialias: !mobile, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 5]} intensity={1} color="#c7d2fe" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#22d3ee" />
      <Universe onSelect={onSelect} selectedNode={selectedNode} />
      {/*
        - NOT MOUNTED AT ALL on touch devices: three-stdlib's OrbitControls
          sets canvas touch-action:none on connect regardless of enableRotate,
          which would turn the full-width canvas into a page-scroll dead zone
          on phones. Auto-rotation still shows every node and taps still select.
        - Polar clamp keeps the view near the equator — edge-on from above or
          below, the squashed sphere collapses all labels into one line.
        - Damping gives the drag inertia instead of a stiff 1:1 follow.
      */}
      {!touch && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.62}
        />
      )}
    </Canvas>
  )
}
