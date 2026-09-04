'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'

import Text from '@/components/atoms/Text'
import { HiFolder, HiFolderOpen } from 'react-icons/hi2'

import { Container } from './styles'
import { Presence, useMotionPreset, variants } from '@/components/motion'

interface ISideFolderProps {
  title: string
  color: string
  children: React.ReactNode
}

export default function SideFolder({
  title = 'teste',
  color = 'red',
  children,
}: ISideFolderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const collapse = useMotionPreset('collapse')

  return (
    <Container $color={color}>
      <div className="side-folder_head" onClick={() => setIsOpen((v) => !v)}>
        {isOpen ? <HiFolderOpen /> : <HiFolder />}
        <Text
          font="label"
          color={isOpen ? 'activeTitle' : 'fontPrimary'}
          tag="span"
        >
          {title}
        </Text>
      </div>

      <Presence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            className="side-folder_content"
            variants={variants.collapse}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={collapse}
            style={{ overflow: 'hidden' }}
          >
            <div className="side-folder_content_inner">{children}</div>
          </motion.div>
        )}
      </Presence>
    </Container>
  )
}
