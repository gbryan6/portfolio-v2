'use client'

import { Text } from '@/components/atoms'
import { NavButton } from '@/components/molecules'
import { usePathname } from 'next/navigation'
import { RiSunFoggyFill, RiMoonFoggyFill } from 'react-icons/ri'
import { motion } from 'motion/react'

import { Container } from './styles'
import { useTheme } from '@/hooks/Theme'
import { Presence, useMotionPreset } from '@/components/motion'

const ROUTES = [
  { href: '/', label: '_olá' },
  { href: '/about-me', label: '_sobre-mim' },
  { href: '/projects', label: '_projetos' },
] as const

function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const iconTransition = useMotionPreset('snappy')

  return (
    <Container>
      <div className="left">
        <Text tag="p" font="snippet" color="fontPrimary">
          gabriel-bryan
        </Text>

        {ROUTES.map(({ href, label }) => (
          <NavButton
            key={href}
            href={href}
            active={pathname === href}
            showIndicator={pathname === href}
          >
            <Text tag="p" font="snippet" color="fontPrimary">
              {label}
            </Text>
          </NavButton>
        ))}
      </div>

      <aside className="right">
        <NavButton href="#" iconOnly onClick={toggleTheme}>
          <Text tag="p" font="snippet" color="fontPrimary">
            <Presence mode="wait">
              <motion.span
                key={theme.title}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={iconTransition}
                style={{ display: 'inline-flex' }}
              >
                {theme.title === 'light' ? (
                  <RiMoonFoggyFill className="theme" />
                ) : (
                  <RiSunFoggyFill className="theme" />
                )}
              </motion.span>
            </Presence>
          </Text>
        </NavButton>

        <NavButton
          href="/contact-me"
          active={pathname === '/contact-me'}
          showIndicator={pathname === '/contact-me'}
        >
          <Text tag="p" font="snippet" color="fontPrimary">
            _fale-comigo
          </Text>
        </NavButton>
      </aside>
    </Container>
  )
}

export default Header
