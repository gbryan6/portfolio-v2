import React, { useState } from 'react'

import Text from '@/components/atoms/Text'
import { HiFolder } from 'react-icons/hi2'
import { HiFolderOpen } from 'react-icons/hi2'

import { Container } from './styles'

interface ISideFolder {
  title: string
  color: string
  children: React.ReactNode
}

export default function SideFolder({
  title = 'teste',
  color = 'red',
  children
}: ISideFolder) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Container color={color} isOpen={isOpen}>
      <div className='side-folder_head' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiFolderOpen /> : <HiFolder />}
        <Text font="label" color={isOpen ? 'activeTitle' : 'fontPrimary'} tag="span">
          {title}
        </Text>
      </div>
      <div className='side-folder_content'>
        {children}
      </div>
    </Container>
  )
}
