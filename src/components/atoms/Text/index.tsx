'use client'

import styled from 'styled-components'
import { Theme } from '@/app/types/styled'

interface ITextProps {
  tag: keyof JSX.IntrinsicElements
  children: React.ReactNode
  font: keyof Theme['typograph']
  color: keyof Theme['colors']
  className?: string
  /** Passthrough attributes for the rendered element (labels, aria wiring…). */
  id?: string
  htmlFor?: string
  'aria-live'?: 'off' | 'polite' | 'assertive'
}

type StyledTextProps = {
  $font: keyof Theme['typograph']
  $color: keyof Theme['colors']
}

type StyledText = React.ComponentType<
  StyledTextProps & {
    className?: string
    children?: React.ReactNode
    id?: string
    htmlFor?: string
    'aria-live'?: 'off' | 'polite' | 'assertive'
  }
>

const make = (tag: keyof JSX.IntrinsicElements): StyledText =>
  (styled(tag)<StyledTextProps>`
    font-size: ${({ theme, $font }) => theme.typograph[$font]};
    color: ${({ theme, $color }) => theme.colors[$color]};
  ` as unknown) as StyledText

// Created once at module load — never inside render (which is what triggered
// styled-components' "created dynamically" warning and killed memoisation).
const PRESET_TAGS = [
  'p',
  'span',
  'pre',
  'div',
  'label',
  'strong',
  'em',
  'small',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const

const registry = new Map<string, StyledText>(
  PRESET_TAGS.map((tag) => [tag, make(tag)])
)

function styledForTag(tag: keyof JSX.IntrinsicElements): StyledText {
  let Component = registry.get(tag)
  if (!Component) {
    Component = make(tag)
    registry.set(tag, Component)
  }
  return Component
}

function Text({
  tag,
  font = 'head',
  color = 'fontPrimary',
  children,
  ...rest
}: ITextProps) {
  const Component = styledForTag(tag)

  return (
    <Component $font={font} $color={color} {...rest}>
      {children}
    </Component>
  )
}

export default Text
