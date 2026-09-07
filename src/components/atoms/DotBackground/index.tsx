'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTheme } from '@/hooks/Theme'
import { Canvas } from './styles'

/** Grid spacing in px — dense, but each dot stays near-invisible until lit by the cursor. */
const GAP = 8
const DOT_RADIUS = 1.2
const BASE_ALPHA = 0.09
const MAX_ALPHA = 0.95
const GLOW_RADIUS = 90
/** Lerp factor the glow's focal point chases the cursor with — softens jumps so it never feels twitchy. */
const FOLLOW_EASE = 0.09
/** How long (ms) the loop keeps running after the focus settles, before going idle. */
const IDLE_GRACE = 400

function hexToRgb(hex: string) {
  const value = parseInt(hex.replace('#', ''), 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

function mixChannel(base: number, target: number, amount: number) {
  return Math.round(base + (target - base) * amount)
}

function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dotColor = hexToRgb(theme.colors.fontPrimary)
    const glowColor = hexToRgb(theme.colors.accent)

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -9999, y: -9999 }
    const focus = { x: -9999, y: -9999 }
    let rafId = 0

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const dx = x - focus.x
          const dy = y - focus.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          let alpha = BASE_ALPHA
          let { r, g, b } = dotColor

          if (dist < GLOW_RADIUS) {
            const proximity = 1 - dist / GLOW_RADIUS
            const eased = proximity * proximity
            alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * eased
            r = mixChannel(dotColor.r, glowColor.r, eased)
            g = mixChannel(dotColor.g, glowColor.g, eased)
            b = mixChannel(dotColor.b, glowColor.b, eased)
          }

          ctx!.beginPath()
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
    }

    function resize() {
      const parent = canvas!.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      // Static grid only — no cursor reactivity, no animation loop.
      return () => window.removeEventListener('resize', resize)
    }

    let settledAt = performance.now()

    let hasPointer = false

    function loop() {
      const dx = pointer.x - focus.x
      const dy = pointer.y - focus.y
      focus.x += dx * FOLLOW_EASE
      focus.y += dy * FOLLOW_EASE
      draw()

      const moving = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5
      if (moving) settledAt = performance.now()

      if (performance.now() - settledAt < IDLE_GRACE) {
        rafId = requestAnimationFrame(loop)
      } else {
        rafId = 0
      }
    }

    function wake() {
      settledAt = performance.now()
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      if (!hasPointer) {
        // Snap on the very first move instead of lerping in from the sentinel position.
        focus.x = pointer.x
        focus.y = pointer.y
        hasPointer = true
      }
      wake()
    }

    function handleMouseLeave() {
      pointer.x = -9999
      pointer.y = -9999
      wake()
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [theme, prefersReducedMotion])

  return <Canvas ref={canvasRef} aria-hidden="true" />
}

export default DotBackground
