import { LinkProps } from 'next/link'
import { IconBaseProps } from 'react-icons'
import { Container, NavIndicator } from './styles'

interface INavButtonProps extends LinkProps {
  icon?: React.ComponentType<IconBaseProps>
  active?: boolean
  iconOnly?: boolean
  textIcon?: boolean
  /** renders the shared active-route underline */
  showIndicator?: boolean
  target?: string
  children?: React.ReactNode
}

export default function NavButton({
  icon: Icon,
  active,
  iconOnly,
  textIcon,
  showIndicator,
  children,
  ...rest
}: INavButtonProps) {
  return (
    <Container
      $active={active}
      $textIcon={textIcon}
      $iconOnly={iconOnly}
      {...rest}
    >
      {children}
      {Icon && <Icon size={20} />}
      {showIndicator && <NavIndicator layoutId="nav-underline" />}
    </Container>
  )
}
