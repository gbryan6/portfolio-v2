'use client'

import { useReducedMotion } from 'motion/react'
import type { Transition } from 'motion/react'
import { routeEnter, spring, tween } from './tokens'

export type PresetName =
  | 'enter'
  | 'layout'
  | 'snappy'
  | 'collapse'
  | 'routeEnter'
  | 'fast'
  | 'base'
  | 'wave'

const PRESETS: Record<PresetName, Transition> = {
  enter: spring.enter,
  layout: spring.layout,
  snappy: spring.snappy,
  // tween for auto-height: springs overshoot on height:'auto'
  collapse: { duration: 0.24, ease: 'easeOut' },
  routeEnter,
  fast: tween.fast,
  base: tween.base,
  wave: tween.wave,
}

/**
 * The only place a Transition object is assembled for a component. Maps a preset
 * name to a token; collapses to an instant transition when the OS "reduce
 * motion" setting is on. Components never inline a duration or spring.
 */
export function useMotionPreset(
  name: PresetName,
  overrides?: Transition
): Transition {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return { duration: 0 }
  return overrides ? { ...PRESETS[name], ...overrides } : PRESETS[name]
}
