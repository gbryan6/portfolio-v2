'use client'

import type { IconType } from 'react-icons'
import { FiExternalLink } from 'react-icons/fi'

import { Text } from '@/components/atoms'
import { Container } from './styles'

interface ISideLinkProps {
  href: string
  label: string
  icon: IconType
  /** http(s) links open in a new tab; mailto:/tel: stay in this one. */
  external?: boolean
  onClick?: () => void
}

export default function SideLink({
  href,
  label,
  icon: Icon,
  external = true,
  onClick,
}: ISideLinkProps) {
  return (
    <Container
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
    >
      <Icon className="side-link_icon" />

      <Text tag="span" font="label" color="fontPrimary">
        {label}
      </Text>

      {external && <FiExternalLink className="side-link_out" aria-hidden />}
    </Container>
  )
}
