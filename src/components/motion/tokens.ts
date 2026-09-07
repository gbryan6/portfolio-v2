import type { Transition } from 'motion/react'

/**
 * The single home for every motion value in the app. NOT in theme.ts — motion
 * params have no dark/light variance, are read in JS (not styled interpolation),
 * and MotionConfig sits above ThemeProvider so a theme.motion would be unreadable
 * there. Add new motion values here; consume them through useMotionPreset.
 */

/** Physical / interruptible motion (position, layout, gestures). */
export const spring: Record<'enter' | 'layout' | 'snappy', Transition> = {
  enter: { type: 'spring', bounce: 0.18, visualDuration: 0.28 },
  layout: { type: 'spring', bounce: 0.2, visualDuration: 0.32 },
  snappy: { type: 'spring', bounce: 0, visualDuration: 0.18 },
}

/** Opacity / colour / auto-height / exits — anything that should not overshoot. */
export const tween: Record<'fast' | 'base' | 'slow' | 'wave', Transition> = {
  fast: { duration: 0.15, ease: 'easeOut' },
  base: { duration: 0.25, ease: 'easeOut' },
  slow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  /** One-shot arm-wave gesture (Astronaut) — a multi-keyframe rotate, which springs can't animate. */
  wave: { duration: 0.9, ease: 'easeInOut' },
}

/** Route entrance — a near-alias of `fast`, used only by (main)/template.tsx. */
export const routeEnter: Transition = { duration: 0.16, ease: 'easeOut' }

/** Sibling stagger steps + a hard cap so long lists still settle quickly. */
export const stagger = { base: 0.06, grid: 0.045, cap: 8 } as const

/** Entrance translate distances in px. `md` matches the retired slideIn's translateY(-10%). */
export const travel = { sm: 6, md: 10 } as const

/** The only sanctioned looping durations (seconds). One ambient loop per surface. */
export const ambient = { food: 1.8 } as const
