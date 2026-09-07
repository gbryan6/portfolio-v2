import { useState, useEffect } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Reveals `text` one character at a time.
 * - `enabled = false` (or the OS "reduce motion" setting) resolves the full
 *   string immediately, with no timers.
 * - Resets cleanly when `text` changes; clears both the delay timeout and the
 *   per-char interval on unmount.
 */
const useTypewriter = (text: string, time = 100, delay = 0, enabled = true) => {
  const prefersReduced = useReducedMotion()
  const instant = !enabled || prefersReduced === true

  // Never branch the initial value on `prefersReduced` — it is null on the
  // server and can be true on the client's first render, which would desync
  // hydration. Start empty; the effect (client-only) fills it when instant.
  const [typedText, setTypedText] = useState(enabled ? '' : text)

  useEffect(() => {
    if (instant) {
      setTypedText(text)
      return
    }

    setTypedText('')
    let index = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setTypedText(text.slice(0, index))
        if (index >= text.length && intervalId) clearInterval(intervalId)
      }, time)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, time, delay, instant])

  return typedText
}

export default useTypewriter
