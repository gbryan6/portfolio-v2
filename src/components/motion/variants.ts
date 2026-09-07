import type { Variants } from 'motion/react'
import { travel } from './tokens'

/** Shared animation vocabulary. States: hidden -> show -> exit. */

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
}

export const revealUp: Variants = {
  hidden: { opacity: 0, y: travel.sm },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: travel.sm },
}

/** Project cards entering / leaving / reordering in the grid. */
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
}

/** Content-pane swap (tab switch, empty <-> content, dev <-> hobbies). */
export const paneSwap: Variants = {
  hidden: { opacity: 0, x: 8 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
}

/** Disclosure open / close — needs overflow:hidden + an inner padded div. */
export const collapse: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

/** Editor tab add / remove — one enter mechanism (width, no scaleX). */
export const tabItem: Variants = {
  hidden: { opacity: 0, width: 0 },
  show: { opacity: 1, width: 'auto' },
  exit: { opacity: 0, width: 0 },
}

const MOTION_KEYS = ['x', 'y', 'z', 'scale', 'width', 'height', 'rotate'] as const

/**
 * Strips transform / size keys (leaving opacity) for the few places that pass a
 * variant straight to a motion element instead of going through useMotionPreset.
 */
export function reduceVariant(v: Variants, reduced: boolean): Variants {
  if (!reduced) return v

  const strip = (state: unknown) => {
    if (!state || typeof state !== 'object') return state
    const copy: Record<string, unknown> = { ...(state as Record<string, unknown>) }
    for (const key of MOTION_KEYS) delete copy[key]
    return copy
  }

  return Object.fromEntries(
    Object.entries(v).map(([name, state]) => [name, strip(state)])
  ) as Variants
}
