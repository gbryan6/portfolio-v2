import React, { useState } from 'react'

import { Container } from './styles'
import { Text } from '@/components/atoms'
import { IoMdArrowDropdown } from 'react-icons/io'

interface IAccordionProps {
  children: React.ReactNode
  title: string
}

export default function Accordion({ children, title }: IAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <Container isOpen={isOpen}>
      <div className="accordion-head" onClick={() => setIsOpen(!isOpen)}>
        <IoMdArrowDropdown />
        <Text
          tag="span"
          font="label"
          color={isOpen ? 'activeTitle' : 'fontPrimary'}
        >
          {title}
        </Text>
      </div>
      <div className="accordion-content">{children}</div>
    </Container>
  )
}
