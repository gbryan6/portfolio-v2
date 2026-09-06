'use client'

import { useCallback, useMemo, useState } from 'react'

export interface IContactValues {
  name: string
  email: string
  message: string
}

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error'

export type ContactField = keyof IContactValues

/** Mirrored by the route handler — the server check is the authoritative one. */
export const CONTACT_LIMITS: Record<ContactField, number> = {
  name: 80,
  email: 140,
  message: 2000,
}

export const MIN_MESSAGE = 10

const EMPTY: IContactValues = { name: '', email: '', message: '' }

// Deliberately permissive: catches typos without rejecting valid odd addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Errors = Partial<Record<ContactField, string>>

function validate(values: IContactValues): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) {
    errors.name = 'como eu te chamo?'
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = 'preciso de um e-mail pra te responder'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'esse e-mail parece incompleto'
  }

  if (values.message.trim().length < MIN_MESSAGE) {
    errors.message = `escreve um pouco mais (mín. ${MIN_MESSAGE} caracteres)`
  }

  return errors
}

/**
 * Form model for /fale-comigo: values, per-field validation, submit lifecycle.
 * Kept out of the page so the code-preview pane can read `values` without
 * inheriting the submit logic.
 */
export function useContactForm() {
  const [values, setValues] = useState<IContactValues>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  // Bots fill every field they find; this one is hidden from people.
  const [honeypot, setHoneypot] = useState('')

  const errors = useMemo(() => validate(values), [values])
  const isValid = Object.keys(errors).length === 0

  const setField = useCallback((field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value.slice(0, CONTACT_LIMITS[field]) }))
    setStatus((prev) => (prev === 'error' ? 'idle' : prev))
  }, [])

  const blur = useCallback((field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const reset = useCallback(() => {
    setValues(EMPTY)
    setTouched({})
    setServerError(null)
    setStatus('idle')
  }, [])

  const submit = useCallback(async () => {
    setTouched({ name: true, email: true, message: true })
    if (!isValid || status === 'sending') return

    setStatus('sending')
    setServerError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(body?.error ?? 'não consegui enviar agora')
      }

      setStatus('sent')
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'não consegui enviar agora'
      )
      setStatus('error')
    }
  }, [isValid, status, values, honeypot])

  /** Only surface an error once the field has been left or a submit was tried. */
  const errorFor = useCallback(
    (field: ContactField) => (touched[field] ? errors[field] : undefined),
    [touched, errors]
  )

  return {
    values,
    errorFor,
    status,
    serverError,
    isValid,
    honeypot,
    setHoneypot,
    setField,
    blur,
    submit,
    reset,
  }
}

/** The model as consumed by <ContactForm /> and the code-preview pane. */
export type ContactForm = ReturnType<typeof useContactForm>
