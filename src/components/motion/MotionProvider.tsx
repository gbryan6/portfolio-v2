'use client'

import type { ReactNode } from 'react'
import { LayoutGroup, MotionConfig } from 'motion/react'

/**
 * App-wide motion context. Renders context only — no DOM, no style injection —
 * so it can sit between <GlobalStyles/> and <ThemeSwitcherProvider> without
 * disturbing the styled-components SSR registry or provider order.
 *
 * - MotionConfig reducedMotion="user": Motion auto-suppresses transform/layout
 *   on every motion.* element and makes AnimatePresence exits instant when the
 *   OS "reduce motion" setting is on.
 * - LayoutGroup: hosts the shared layoutId markers (nav-underline, tab-active,
 *   rail-active) so they glide between siblings.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>{children}</LayoutGroup>
    </MotionConfig>
  )
}
