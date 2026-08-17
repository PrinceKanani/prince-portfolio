/**
 * 2D animated background used when WebGL is unavailable.
 * Pure CSS: soft gradient blobs + the shared grid overlay.
 */
export default function Fallback2D() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl motion-safe:animate-pulse"
        style={{ background: 'radial-gradient(circle, var(--glow-1), transparent 65%)' }}
      />
      <div
        className="absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow-2), transparent 65%)' }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow-1), transparent 65%)' }}
      />
    </div>
  )
}
