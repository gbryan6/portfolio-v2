import { useState } from 'react'

import Checkbox from '@/components/atoms/Checkbox'
import { Container } from './styles'
import IconText from '../IconText'
import { IconType } from 'react-icons'

interface ITechCheckbox {
  id: string
  icon: IconType
  techName: string
  selected: boolean
}

interface ITechCheckBoxProps {
  techCheckboxData: ITechCheckbox
  onChangeValue?: (techCheckboxData: ITechCheckbox) => void
}

function TechCheckbox({ techCheckboxData, onChangeValue }: ITechCheckBoxProps) {
  const { icon, techName, selected } = techCheckboxData

  const handleChange = () => {
    if (onChangeValue) {
      onChangeValue(techCheckboxData)
    }
  }

  return (
    <Container onClick={() => handleChange()}>
      <Checkbox checked={selected} checkboxId={techName} />
      <IconText
        text={techName}
        icon={icon}
        active={selected}
        className="tech-checkbox_right"
      />
    </Container>
  )
}

export default TechCheckbox
