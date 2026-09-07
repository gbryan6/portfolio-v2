'use client'

import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreset } from './useMotionPreset'
import { travel } from './tokens'

type RevealTag = 'div' | 'section' | 'article' | 'span' | 'main' | 'header' | 'p'

interface RevealProps {
  children: ReactNode
  as?: RevealTag
  delay?: number
  y?: number
  /** Pass false for content already present in the server HTML on first paint. */
  initial?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Mount entrance: opacity 0 -> 1 plus a small translateY. Drop-in replacement
 * for the global `.slide-in` class.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = travel.sm,
  initial = true,
  className,
  style,
}: RevealProps) {
  const transition = useMotionPreset('enter', delay ? { delay } : undefined)
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      style={style}
      initial={initial ? { opacity: 0, y } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </MotionTag>
  )
}
