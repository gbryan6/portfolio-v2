'use client'

import type { Theme } from '@/app/types/styled'
import { Text } from '@/components/atoms'
import { Container, LineNumbers, Code, Token } from './styles'

/** A syntax-coloured run of text. Colours are theme keys, never literals. */
export interface ICodeToken {
  text: string
  color: keyof Theme['colors']
}

export type CodeLine = ICodeToken[]

interface ICodePreviewProps {
  lines: CodeLine[]
  /** Describes the pane for screen readers. */
  label: string
}

export default function CodePreview({ lines, label }: ICodePreviewProps) {
  return (
    <Container role="region" aria-label={label}>
      <LineNumbers aria-hidden>
        {lines.map((_, index) => (
          <Text tag="span" font="snippet" color="fontPrimary" key={index + 1}>
            {index + 1}
          </Text>
        ))}
      </LineNumbers>

      <Code>
        {lines.map((tokens, index) => (
          <Text tag="pre" font="snippet" color="fontPrimary" key={index}>
            {tokens.map((token, tokenIndex) => (
              <Token key={tokenIndex} $color={token.color}>
                {token.text}
              </Token>
            ))}
          </Text>
        ))}
      </Code>
    </Container>
  )
}
