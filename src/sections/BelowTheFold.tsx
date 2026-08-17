import { useEffect } from 'react'
import { sectionOrder } from '../data/sections'
import { AssetShowcase } from './AssetShowcase'
import { TallyShowcase } from './TallyShowcase'
import { QRShowcase } from './QRShowcase'
import { Automation } from './Automation'
import { ProductThinking } from './ProductThinking'
import { Agile } from './Agile'
import { Architecture } from './Architecture'
import { Achievements } from './Achievements'
import { Education } from './Education'
import { Certifications } from './Certifications'
import { Products } from './Products'
import { LinkedInSection } from './LinkedInSection'
import { ResumeSection } from './ResumeSection'
import { Contact } from './Contact'

/** Section ids rendered by this chunk — the only fragments worth re-honoring. */
const BELOW_THE_FOLD_IDS = new Set<string>(
  sectionOrder.slice(sectionOrder.indexOf('asset-management')),
)

/** Everything below the project showcase, code-split into a single deferred chunk. */
export default function BelowTheFold() {
  // Deep links (and nav clicks made before this chunk loaded) target sections
  // that don't exist until this chunk mounts — the browser has already given
  // up on the fragment by then, so honor it once the sections are in the DOM.
  // Only for ids owned by THIS chunk: re-scrolling to an eager section would
  // yank the viewport away from wherever the user has scrolled meanwhile.
  useEffect(() => {
    let id = window.location.hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      // Malformed percent-encoding (e.g. "#100%") — use the raw fragment;
      // an uncaught URIError here would unmount the whole app.
    }
    if (!id || !BELOW_THE_FOLD_IDS.has(id)) return
    document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <AssetShowcase />
      <TallyShowcase />
      <QRShowcase />
      <Automation />
      <ProductThinking />
      <Agile />
      <Architecture />
      <Achievements />
      <Education />
      <Certifications />
      <Products />
      {/* GitHubSection intentionally removed (owner request) — re-add here and
          in sectionOrder once the account has public repositories to show. */}
      <LinkedInSection />
      <ResumeSection />
      <Contact />
    </>
  )
}
