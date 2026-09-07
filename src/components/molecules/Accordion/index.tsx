'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import { Container } from './styles'
import { Text } from '@/components/atoms'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Presence, useMotionPreset, variants } from '@/components/motion'

interface IAccordionProps {
  children: React.ReactNode
  title: string
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export default function Accordion({
  children,
  title,
  defaultOpen = true,
  onToggle,
}: IAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const collapse = useMotionPreset('collapse')
  const arrow = useMotionPreset('snappy')

  const handleToggle = () => {
    setIsOpen((v) => {
      onToggle?.(!v)
      return !v
    })
  }

  return (
    <Container $isOpen={isOpen}>
      <div className="accordion-head" onClick={handleToggle}>
        <motion.span
          className="accordion-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={arrow}
        >
          <IoMdArrowDropdown />
        </motion.span>
        <Text
          tag="span"
          font="label"
          color={isOpen ? 'activeTitle' : 'fontPrimary'}
        >
          {title}
        </Text>
      </div>

      <Presence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            className="accordion-content"
            variants={variants.collapse}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={collapse}
            style={{ overflow: 'hidden' }}
          >
            <div className="accordion-content_inner">{children}</div>
          </motion.div>
        )}
      </Presence>
    </Container>
  )
}
