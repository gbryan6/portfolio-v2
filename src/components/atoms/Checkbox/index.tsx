'use client'

import { InputHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { FaCheck } from 'react-icons/fa6'
import { Container } from './styles'
import { Presence, useMotionPreset } from '@/components/motion'

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  checkboxId: string
}

function Checkbox({ checked: checkedProp, checkboxId, ...rest }: ICheckboxProps) {
  const glyph = useMotionPreset('snappy')

  return (
    <Container htmlFor={`checkbox-${checkboxId}`}>
      <input
        type="checkbox"
        id={`checkbox-${checkboxId}`}
        checked={checkedProp}
        {...rest}
        readOnly
      />
      <span className="checkmark">
        <Presence initial={false}>
          {checkedProp && (
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
