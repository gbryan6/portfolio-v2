'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useMotionPreset } from './useMotionPreset'
import { stagger as staggerTokens } from './tokens'

type StaggerTag = 'div' | 'section' | 'ul' | 'ol' | 'main' | 'nav'

interface StaggerProps {
  children: ReactNode
  as?: StaggerTag
  step?: number
  delay?: number
  className?: string
  initial?: boolean
}

const containerVariants = (step: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/** Orchestration parent — drives its <StaggerItem> children in sequence. */
export function Stagger({
  children,
  as = 'div',
  step = staggerTokens.base,
  delay = 0,
  className,
  initial = true,
}: StaggerProps) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      variants={containerVariants(step, delay)}
      initial={initial ? 'hidden' : false}
      animate="show"
    >
      {children}
    </MotionTag>
  )
}

type StaggerItemTag = 'div' | 'li' | 'span' | 'section' | 'p'

interface StaggerItemProps {
  children: ReactNode
  as?: StaggerItemTag
  /** optional translateY on entrance (0 = fade only) */
  y?: number
  className?: string
}

export function StaggerItem({
  children,
  as = 'div',
  y = 0,
  className,
}: StaggerItemProps) {
  const transition = useMotionPreset('base')
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, ...(y ? { y } : null) },
    show: { opacity: 1, ...(y ? { y: 0 } : null), transition },
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
