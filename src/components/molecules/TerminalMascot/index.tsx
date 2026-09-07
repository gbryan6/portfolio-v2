'use client'

import { Astronaut, Text } from '@/components/atoms'
import { Container } from './styles'

interface ITerminalMascotProps {
  /** Bump to make the mascot wave (forwarded to Astronaut). */
  trigger?: number
}

export default function TerminalMascot({ trigger = 0 }: ITerminalMascotProps) {
  return (
    <Container>
      <div className="terminal-mascot_bar">
        <span className="terminal-mascot_dot" />
        <span className="terminal-mascot_dot" />
        <span className="terminal-mascot_dot" />
        <Text tag="span" font="snippet" color="fontPrimary">
          bash
        </Text>
      </div>

      <div className="terminal-mascot_body">
        <Astronaut trigger={trigger} />

        <div className="terminal-mascot_lines">
          <Text tag="p" font="snippet" color="fontSecondary">
            @gbryandev
          </Text>
          <Text tag="p" font="snippet" color="fontPrimary">
            <span className="terminal-mascot_prompt">&gt;</span>oi, sou o Gabriel
          </Text>
          <Text tag="p" font="snippet" color="fontPrimary">
            <span className="terminal-mascot_prompt">&gt;</span>bem-vindo
            <span className="terminal-mascot_cursor" />
          </Text>
        </div>
      </div>
    </Container>
  )
}
