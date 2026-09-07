'use client'

import type { ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'

interface PresenceProps {
  children: ReactNode
  mode?: 'sync' | 'wait' | 'popLayout'
  /**
   * Defaults to false so the one post-hydration theme re-render never replays
   * entrance/exit animations. Pass true only for genuine first-mount reveals.
   */
  initial?: boolean
}

export default function Presence({
  children,
  mode = 'sync',
  initial = false,
}: PresenceProps) {
  return (
    <AnimatePresence mode={mode} initial={initial}>
      {children}
    </AnimatePresence>
  )
}
