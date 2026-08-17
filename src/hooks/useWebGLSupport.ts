import { useState } from 'react'

let cached: boolean | null = null

function detectWebGL(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    cached = Boolean(gl)
  } catch {
    cached = false
  }
  return cached
}

/** True when the browser can create a WebGL context; used to gate all 3D scenes. */
export function useWebGLSupport(): boolean {
  const [supported] = useState(detectWebGL)
  return supported
}
