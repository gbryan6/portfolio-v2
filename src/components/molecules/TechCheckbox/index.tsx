'use client'

import { IconType } from 'react-icons'

import Checkbox from '@/components/atoms/Checkbox'
import IconText from '../IconText'
import { Container } from './styles'

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
  const { id, icon, techName, selected } = techCheckboxData
  const inputId = `checkbox-${id}`

  /*
   * The row is the input's <label>, so the box, the icon and the name all
   * activate the same control. The input's own onChange is the only handler —
   * a click listener up here would double-fire on every label activation.
   */
  return (
    <Container htmlFor={inputId}>
      <Checkbox
        id={inputId}
        checked={selected}
        onChange={() => onChangeValue?.(techCheckboxData)}
      />

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
