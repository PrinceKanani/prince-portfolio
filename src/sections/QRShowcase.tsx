import { Suspense, lazy, useState } from 'react'
import { QrCode, ScanLine, Printer, Hash } from 'lucide-react'
import { motion } from 'motion/react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import { useReducedMotion } from '../hooks/useMediaQuery'

const QRCube = lazy(() => import('../components/three/QRCube'))

const capabilities = [
  { icon: QrCode, title: 'Generation', text: 'QR codes, barcodes and DataMatrix with serial-number tracking.' },
  { icon: Printer, title: 'Label printing', text: 'Zebra printer integration via ZPL label templates.' },
  { icon: ScanLine, title: 'Scanning', text: 'Scanner integration resolves any physical item in one read.' },
  { icon: Hash, title: 'Identification', text: 'Every asset carries a unique, verifiable identity.' },
]

export function QRShowcase() {
  const project = projects.find((p) => p.id === 'qr-barcode')
  const webgl = useWebGLSupport()
  const reduced = useReducedMotion()
  // Non-latching in-view drives `paused` so the canvas stops rendering
  // off-screen; `everInView` latches so the scene mounts only once.
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px 0px' }, false)
  const [everInView, setEverInView] = useState(false)
  if (inView && !everInView) setEverInView(true)
  const [scanning, setScanning] = useState(false)

  return (
    <Section
      id="qr-barcode"
      kicker="Identification"
      title="QR / Barcode System"
      subtitle="The physical–digital bridge: hover the cube to simulate a scan."
      wide
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* 3D QR cube */}
        <Reveal>
          <div
            ref={ref}
            className="glass relative h-80 overflow-hidden rounded-3xl lg:h-full lg:min-h-96"
            onMouseEnter={() => setScanning(true)}
            onMouseLeave={() => setScanning(false)}
            onFocus={() => setScanning(true)}
            onBlur={() => setScanning(false)}
            tabIndex={0}
            role="img"
            aria-label="Rotating 3D cube with a QR code pattern"
          >
            {webgl && everInView ? (
              <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted">Loading…</div>}>
                <QRCube scanning={scanning} paused={!inView} />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center">
                <QrCode size={120} aria-hidden="true" className="text-accent/60" />
              </div>
            )}
            {/* Scan line */}
            {!reduced && scanning && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-6 h-0.5 rounded bg-cyan shadow-[0_0_18px_var(--c-cyan)]"
                initial={{ top: '8%' }}
                animate={{ top: ['8%', '90%', '8%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <span
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-[11px] tracking-widest uppercase transition-colors ${
                scanning ? 'border-cyan/60 text-cyan' : 'border-line text-faint'
              }`}
            >
              {scanning ? 'Scanning…' : 'Hover to scan'}
            </span>
          </div>
        </Reveal>

        {/* Capabilities */}
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {capabilities.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <GlassCard className="h-full p-6">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                </GlassCard>
              </Reveal>
            )
          })}
          {project && (
            <Reveal delay={0.3} className="sm:col-span-2">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <Badge key={t} tone="accent">
                    {t}
                  </Badge>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  )
}
