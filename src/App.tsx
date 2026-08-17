import { Suspense, lazy, useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { LoadingScreen } from './components/layout/LoadingScreen'
import { Navigation } from './components/layout/Navigation'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Footer } from './components/layout/Footer'
import { CustomCursor } from './components/ui/CustomCursor'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { ProductManagement } from './sections/ProductManagement'
import { Projects } from './sections/Projects'
import { useTheme } from './hooks/useTheme'
import { useWebGLSupport } from './hooks/useWebGLSupport'

const Scene3D = lazy(() => import('./components/three/Scene3D'))
const Fallback2D = lazy(() => import('./components/three/Fallback2D'))
const BelowTheFold = lazy(() => import('./sections/BelowTheFold'))

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const webgl = useWebGLSupport()
  const [loaded, setLoaded] = useState(false)

  // Branded loading screen tied to real readiness: dismiss once fonts are in
  // (min 700ms so it never just flashes), with a 1.6s hard cap so a slow font
  // CDN can't hold the page hostage.
  useEffect(() => {
    let dismissed = false
    const finish = () => {
      if (!dismissed) {
        dismissed = true
        setLoaded(true)
      }
    }
    const minDelay = new Promise((resolve) => setTimeout(resolve, 700))
    const fontsReady = document.fonts?.ready.catch(() => undefined) ?? Promise.resolve()
    void Promise.all([minDelay, fontsReady]).then(finish)
    const cap = setTimeout(finish, 1600)
    return () => clearTimeout(cap)
  }, [])

  return (
    // reducedMotion="user" makes ALL motion animations honor
    // prefers-reduced-motion, including any not individually gated.
    <MotionConfig reducedMotion="user">
      {/* WCAG 2.4.1: let keyboard users bypass the ~15-control header. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-accent-strong focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <LoadingScreen done={loaded} />
      <CustomCursor />
      <ScrollProgress />

      {/* 3D environment (or 2D fallback when WebGL is unavailable) */}
      <Suspense fallback={null}>{webgl ? <Scene3D /> : <Fallback2D />}</Suspense>

      <Navigation theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProductManagement />
        <Projects />
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm text-muted" role="status">
              Loading more…
            </div>
          }
        >
          <BelowTheFold />
        </Suspense>
      </main>

      <Footer />
    </MotionConfig>
  )
}
