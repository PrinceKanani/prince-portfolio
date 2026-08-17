import { AnimatePresence, motion } from 'motion/react'
import { siteConfig } from '../../config/siteConfig'

interface LoadingScreenProps {
  done: boolean
}

export function LoadingScreen({ done }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          aria-label="Loading portfolio"
          role="status"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.3, 1] }}
            className="relative flex h-24 w-24 items-center justify-center"
          >
            <motion.span
              className="absolute inset-0 rounded-3xl border-2 border-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-2 rounded-2xl border border-cyan/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <span className="gradient-text font-display text-3xl font-bold">{siteConfig.initials}</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-sm tracking-[0.25em] text-muted uppercase"
          >
            Loading Portfolio…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
