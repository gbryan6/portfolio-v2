'use client'

import type { Theme } from '@/app/types/styled'
import { Text } from '@/components/atoms'

import { Container, Field, TextArea } from './styles'

/**
 * The label is a Text configuration rather than a bare string, so a call site
 * can restyle it without the component growing a new prop each time. Omitting
 * `font`/`color` reproduces the form look used across the site.
 */
export interface IInputLabel {
  text: string
  font?: keyof Theme['typograph']
  color?: keyof Theme['colors']
}

interface IInputProps {
  id: string
  label: IInputLabel
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  type?: 'text' | 'email'
  multiline?: boolean
  rows?: number
  maxLength?: number
  autoComplete?: string
  disabled?: boolean
  /** Only rendered once the field has been touched — see useContactForm. */
  error?: string
}

export default function Input({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 5,
  maxLength,
  autoComplete,
  disabled,
  error,
}: IInputProps) {
  const invalid = Boolean(error)
  const errorId = `${id}-error`

  const shared = {
    id,
    name: id,
    value,
    placeholder,
    maxLength,
    autoComplete,
    disabled,
    $invalid: invalid,
    'aria-invalid': invalid,
    'aria-describedby': invalid ? errorId : undefined,
    onBlur,
  }

  return (
    <Container>
      <Text
        tag="label"
        font={label.font ?? 'label'}
        color={label.color ?? 'fontPrimary'}
        htmlFor={id}
      >
        {label.text}
      </Text>

      {multiline ? (
        <TextArea
          {...shared}
          rows={rows}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <Field
          {...shared}
          type={type}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      <div className="input_error">
        {invalid && (
          <Text tag="span" font="snippet" color="highlight" id={errorId}>
            {error}
          </Text>
        )}
      </div>
    </Container>
  )
}
