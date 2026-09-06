'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { RiSunFoggyFill, RiMoonFoggyFill } from 'react-icons/ri'

import { Text } from '@/components/atoms'
import { Presence, useMotionPreset, variants } from '@/components/motion'
import { useTheme } from '@/hooks/Theme'

import { Overlay, SectionLabel, MenuLink, ThemeRow } from './styles'

export interface IMobileMenuRoute {
  href: string
  label: string
}

interface IMobileMenuProps {
  open: boolean
  routes: readonly IMobileMenuRoute[]
  activeHref: string
  onClose: () => void
}

export default function MobileMenu({
  open,
  routes,
  activeHref,
  onClose,
}: IMobileMenuProps) {
  const swap = useMotionPreset('base')
  const icon = useMotionPreset('snappy')
  const { theme, toggleTheme } = useTheme()

  // Escape closes it — the only way out other than tapping a route or the X.
  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <Presence>
      {open && (
        <Overlay
          key="mobile-menu"
          id="mobile-menu"
          variants={variants.fade}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={swap}
        >
          <SectionLabel>
            <Text tag="span" font="snippet" color="fontPrimary">
              # navegar:
            </Text>
          </SectionLabel>

          {routes.map(({ href, label }) => (
            <MenuLink key={href} href={href} onClick={onClose}>
              <Text
                tag="span"
                font="label"
                color={activeHref === href ? 'activeTitle' : 'fontPrimary'}
              >
                {label}
              </Text>
            </MenuLink>
          ))}

          <ThemeRow type="button" onClick={toggleTheme}>
            <Text tag="span" font="label" color="fontPrimary">
              {theme.title === 'light' ? '_tema-escuro' : '_tema-claro'}
            </Text>

            <Presence mode="wait">
              <motion.span
                key={theme.title}
                className="mobile-menu_theme-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={icon}
              >
                {theme.title === 'light' ? <RiMoonFoggyFill /> : <RiSunFoggyFill />}
              </motion.span>
            </Presence>
          </ThemeRow>
        </Overlay>
      )}
    </Presence>
  )
}
