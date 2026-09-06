'use client'

import { motion } from 'motion/react'
import { FaCheck } from 'react-icons/fa6'

import { Container } from './styles'
import { Presence, useMotionPreset } from '@/components/motion'

interface ICheckboxProps {
  /** id of the real input — the owning <label> points at this. */
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

/**
 * Renders only the control, never its own <label>: the caller owns the label so
 * a click anywhere on the row activates the input exactly once.
 */
function Checkbox({ id, checked, onChange, disabled }: ICheckboxProps) {
  const glyph = useMotionPreset('snappy')

  return (
    <Container>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span className="checkmark">
        <Presence initial={false}>
          {checked && (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={glyph}
              style={{ display: 'inline-flex' }}
            >
              <FaCheck />
            </motion.span>
          )}
        </Presence>
      </span>
    </Container>
  )
}

export default Checkbox
