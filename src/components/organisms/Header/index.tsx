'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { RiSunFoggyFill, RiMoonFoggyFill, RiMenuLine, RiCloseLine } from 'react-icons/ri'

import { Text } from '@/components/atoms'
import { NavButton } from '@/components/molecules'
import MobileMenu from '@/components/organisms/MobileMenu'
import { Presence, useMotionPreset } from '@/components/motion'
import { useTheme } from '@/hooks/Theme'

import { Container, MenuToggle } from './styles'

const ROUTES = [
  { href: '/', label: '_olá' },
  { href: '/about-me', label: '_sobre-mim' },
  { href: '/projects', label: '_projetos' },
] as const

/** The mobile sheet lists every route, including the one kept on the right. */
const MOBILE_ROUTES = [...ROUTES, { href: '/contact-me', label: '_fale-comigo' }] as const

function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const iconTransition = useMotionPreset('snappy')

  const [menuOpen, setMenuOpen] = useState(false)

  // A route change always dismisses the sheet, including back/forward.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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

      <MenuToggle
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'fechar menu' : 'abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <Presence mode="wait">
          <motion.span
            key={menuOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={iconTransition}
            style={{ display: 'inline-flex' }}
          >
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </motion.span>
        </Presence>
      </MenuToggle>

      <MobileMenu
        open={menuOpen}
        routes={MOBILE_ROUTES}
        activeHref={pathname}
        onClose={() => setMenuOpen(false)}
      />
    </Container>
  )
}

export default Header
