import { useEffect, useState } from 'react'
import { Download, Eye, FileText } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { MagneticButton } from '../components/ui/MagneticButton'
import { siteConfig, publicAsset } from '../config/siteConfig'

type ResumeState = 'checking' | 'available' | 'missing'

export function ResumeSection() {
  const [state, setState] = useState<ResumeState>('checking')
  const url = publicAsset(siteConfig.resumePath)

  useEffect(() => {
    let cancelled = false
    // Dev servers answer missing files with the SPA's index.html, so reject
    // HTML responses — but don't demand a `pdf` content-type: static hosts may
    // serve the file as application/octet-stream, omit the header on HEAD, or
    // reject HEAD outright with 405 even though the PDF downloads fine.
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        const available = (res.ok && !type.includes('text/html')) || res.status === 405
        if (!cancelled) setState(available ? 'available' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setState('missing')
      })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <Section id="resume" kicker="Resume" title="Want the complete professional profile?">
      <Reveal>
        <GlassCard hover={false} className="noise mx-auto flex max-w-2xl flex-col items-center gap-5 p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <FileText size={26} aria-hidden="true" />
          </span>
          {state === 'available' ? (
            <>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Everything on this site, condensed into one document — experience, skills, projects and education.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <MagneticButton href={url} external>
                  <Download size={16} aria-hidden="true" /> Download Resume
                </MagneticButton>
                <MagneticButton href={url} variant="ghost" external>
                  <Eye size={16} aria-hidden="true" /> View Resume
                </MagneticButton>
              </div>
            </>
          ) : state === 'missing' ? (
            <p className="max-w-md text-sm leading-relaxed text-muted">
              The resume PDF isn't uploaded yet. Add it at{' '}
              <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">public/{siteConfig.resumePath}</code> and
              the download buttons will appear here automatically.
            </p>
          ) : (
            <p className="text-sm text-muted">Checking resume availability…</p>
          )}
        </GlassCard>
      </Reveal>
    </Section>
  )
}
