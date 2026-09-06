'use client'

import { useEffect } from 'react'
import { useAnimate, useReducedMotion } from 'motion/react'
import { useMotionPreset } from '@/components/motion'
import { Wrapper } from './styles'

interface IAstronautProps {
  /** Bump this (e.g. an incrementing counter) whenever an action should make the astronaut wave. */
  trigger?: number
}

// Colour roles — resolved to theme tokens by the styled Wrapper (see styles.ts).
const PALETTE: Record<string, string> = {
  S: 'var(--astro-suit)', // suit / helmet rim
  V: 'var(--astro-visor)', // visor / chest light
  L: 'var(--astro-line)', // eyes / boots
  H: 'var(--astro-shade)', // soft shade
}

// 16 × 18 pixel grid, one char per cell. The raised left arm lives in ARM so it
// can rotate on its own; everything else (incl. the resting right arm) is BODY.
const BODY = [
  '................',
  '................',
  '......SSSS......',
  '.....SVVVVS.....',
  '.....SLVVLS.....',
  '.....SVVVVS.....',
  '......SSSS......',
  '.....SSSSSSS....',
  '.....SSVVSSS....',
  '.....SSSSSSS....',
  '......SSSS.S....',
  '......S..S......',
  '......S..S......',
  '......S..S......',
  '......S..S......',
  '.....HH..HH.....',
  '................',
  '................',
]

// The single raised hand (image-left). Pivots at the shoulder ~ (4.5, 7.5).
const ARM: { x: number; y: number; c: string }[] = [
  { x: 4, y: 7, c: 'S' },
  { x: 4, y: 6, c: 'S' },
  { x: 4, y: 5, c: 'S' },
  { x: 4, y: 4, c: 'S' },
  { x: 3, y: 4, c: 'S' },
  { x: 3, y: 5, c: 'H' },
]

export default function Astronaut({ trigger = 0 }: IAstronautProps) {
  const [scope, animate] = useAnimate()
  const wave = useMotionPreset('wave')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (trigger === 0 || prefersReducedMotion) return
    // Only the raised left hand moves.
    animate('.astronaut-arm-left', { rotate: [0, -16, -2, -12, 0] }, wave)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <Wrapper>
      <svg
        ref={scope}
        viewBox="0 0 16 18"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        aria-hidden="true"
        focusable="false"
      >
        <g>
          {BODY.flatMap((row, y) =>
            row.split('').map((c, x) =>
              c === '.' ? null : (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="1"
                  height="1"
                  fill={PALETTE[c]}
                />
              )
            )
          )}
        </g>

        <g
          className="astronaut-arm-left"
          style={{ transformBox: 'view-box', transformOrigin: '4.5px 7.5px' }}
        >
          {ARM.map(({ x, y, c }) => (
            <rect
              key={`arm-${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={PALETTE[c]}
            />
          ))}
        </g>
      </svg>
    </Wrapper>
  )
}
