import { Text } from '@/components/atoms'
import { NavButton } from '@/components/molecules'
import { usePathname } from 'next/navigation'
import { RiSunFoggyFill, RiMoonFoggyFill } from 'react-icons/ri'

import { Container } from './styles'
import { useTheme } from '@/hooks/Theme'

function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <Container>
      <div className="left">
        <Text tag="p" font="label" color="fontPrimary">
          gabriel-bryan
        </Text>
        <NavButton href="/" active={pathname == '/'}>
          <Text tag="p" font="label" color="fontPrimary">
            _olá
          </Text>
        </NavButton>
        <NavButton href="/about-me" active={pathname == '/about-me'}>
          <Text tag="p" font="label" color="fontPrimary">
            _sobre-mim
          </Text>
        </NavButton>
        <NavButton href="/projects" active={pathname == '/projects'}>
          <Text tag="p" font="label" color="fontPrimary">
            _projetos
          </Text>
        </NavButton>
      </div>
      <aside className="right">
        <NavButton href="#" iconOnly onClick={toggleTheme}>
          <Text tag="p" font="label" color="fontPrimary">
            {theme.title == 'light' ? (
              <RiMoonFoggyFill className="theme" />
            ) : (
              <RiSunFoggyFill className="theme" />
            )}
          </Text>
        </NavButton>
        <NavButton href="/contact-me" active={pathname == '/contact-me'}>
          <Text tag="p" font="label" color="fontPrimary">
            _fale-comigo
          </Text>
        </NavButton>
      </aside>
    </Container>
  )
}

export default Header
