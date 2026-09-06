'use client'

import type { Theme } from '@/app/types/styled'
import { Text } from '@/components/atoms'
import { useMotionPreset } from '@/components/motion'

import { AnchorElement, ButtonElement, type ButtonVariant } from './styles'

interface IButtonProps {
  children: React.ReactNode
  /** `solid` = bordered box (forms, actions); `pill` = rounded link chip. */
  variant?: ButtonVariant
  /** Typography of the label, so a call site can reproduce its own look. */
  font?: keyof Theme['typograph']
  color?: keyof Theme['colors']

  /** Passing `href` renders an <a> instead of a <button>. */
  href?: string
  target?: string
  rel?: string

  id?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'solid',
  font = 'snippet',
  color = 'activeTitle',
  href,
  target,
  rel,
  id,
  type = 'button',
  onClick,
  disabled,
  className,
}: IButtonProps) {
  const snappy = useMotionPreset('snappy')

  const label = (
    <Text tag="span" font={font} color={color}>
      {children}
    </Text>
  )

  const motionProps = {
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: snappy,
  }

  if (href) {
    return (
      <AnchorElement
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={className}
        $variant={variant}
        {...motionProps}
      >
        {label}
      </AnchorElement>
    )
  }

  return (
    <ButtonElement
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      $variant={variant}
      {...motionProps}
    >
      {label}
    </ButtonElement>
  )
}
