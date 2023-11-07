import { LinkProps } from 'next/link'
import { IconBaseProps } from 'react-icons'
import { Container } from './styles'

interface ITextProps extends LinkProps {
  icon?: React.ComponentType<IconBaseProps>
  active?: boolean
  iconOnly?: boolean
  textIcon?: boolean
  target?: string
  children?: React.ReactNode
}

export default function NavButton({
  icon: Icon,
  active,
  iconOnly,
  textIcon,
  children,
  ...rest
}: ITextProps) {
  return (
    <Container active={active} textIcon={textIcon} iconOnly={iconOnly} {...rest}>
      {children}
      {Icon && <Icon size={20} />}
    </Container>
  )
}
