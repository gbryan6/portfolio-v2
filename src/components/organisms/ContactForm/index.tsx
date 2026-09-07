'use client'

import type { FormEvent } from 'react'

import { Text } from '@/components/atoms'
import Button from '@/components/molecules/Button'
import Input from '@/components/molecules/Input'
import { Presence, Stagger, StaggerItem, useMotionPreset, variants } from '@/components/motion'
import { CONTACT_LIMITS, type ContactForm as ContactFormModel } from '@/hooks/useContactForm'

import { Container, Form, Sent } from './styles'

interface IContactFormProps {
  form: ContactFormModel
}

export default function ContactForm({ form }: IContactFormProps) {
  const {
    values,
    errorFor,
    status,
    serverError,
    honeypot,
    setHoneypot,
    setField,
    blur,
    submit,
    reset,
  } = form

  const swap = useMotionPreset('base')
  const sending = status === 'sending'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <Container>
      <div className="contact-form_shell">
        <Presence mode="wait" initial={false}>
          {status === 'sent' ? (
            <Sent
              key="sent"
              variants={variants.paneSwap}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={swap}
            >
              <div className="contact-form_sent-lines">
                <Text tag="p" font="label" color="accent">
                  mensagem enviada
                </Text>
                <Text tag="p" font="snippet" color="fontPrimary">
                  <span className="contact-form_prompt">&gt;</span>
                  valeu, {values.name.trim().split(' ')[0]}! respondo no seu
                  e-mail em breve.
                </Text>
              </div>

              <Button onClick={reset} color="fontPrimary">
                enviar-outra
              </Button>
            </Sent>
          ) : (
            <Form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              variants={variants.paneSwap}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={swap}
            >
              <Stagger step={0.05} className="contact-form_fields">
                <StaggerItem y={6}>
                  <Input
                    id="name"
                    label={{ text: '_nome:' }}
                    value={values.name}
                    onChange={(value) => setField('name', value)}
                    onBlur={() => blur('name')}
                    maxLength={CONTACT_LIMITS.name}
                    autoComplete="name"
                    disabled={sending}
                    error={errorFor('name')}
                  />
                </StaggerItem>

                <StaggerItem y={6}>
                  <Input
                    id="email"
                    label={{ text: '_email:' }}
                    type="email"
                    value={values.email}
                    onChange={(value) => setField('email', value)}
                    onBlur={() => blur('email')}
                    maxLength={CONTACT_LIMITS.email}
                    autoComplete="email"
                    disabled={sending}
                    error={errorFor('email')}
                  />
                </StaggerItem>

                <StaggerItem y={6}>
                  <Input
                    id="message"
                    label={{ text: '_mensagem:' }}
                    multiline
                    placeholder="sua mensagem aqui..."
                    value={values.message}
                    onChange={(value) => setField('message', value)}
                    onBlur={() => blur('message')}
                    maxLength={CONTACT_LIMITS.message}
                    disabled={sending}
                    error={errorFor('message')}
                  />
                </StaggerItem>

                <StaggerItem y={6}>
                  <Button
                    id="submit-message"
                    type="submit"
                    disabled={sending}
                    color="fontPrimary"
                  >
                    {sending ? 'enviando...' : 'enviar-mensagem'}
                  </Button>
                </StaggerItem>
              </Stagger>

              <label className="contact-form_honeypot" htmlFor="company">
                não preencha este campo
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </label>

              <div className="contact-form_status">
                {status === 'error' && serverError && (
                  <Text
                    tag="span"
                    font="snippet"
                    color="highlight"
                    aria-live="polite"
                  >
                    {serverError}
                  </Text>
                )}
              </div>
            </Form>
          )}
        </Presence>
      </div>
    </Container>
  )
}
