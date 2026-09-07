'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useMotionPreset } from '@/components/motion'

// Templates remount on every navigation. This module-level flag stays true
// afterwards, so the cold load (SSR paint) never fades — only in-app route
// changes do.
let hasMounted = false

export default function Template({ children }: { children: React.ReactNode }) {
  const transition = useMotionPreset('routeEnter')

  useEffect(() => {
    hasMounted = true
  }, [])

  return (
    <motion.div
      initial={hasMounted ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={transition}
      style={{ height: '100%', minHeight: 0 }}
    >
      {children}
    </motion.div>
  )
}
