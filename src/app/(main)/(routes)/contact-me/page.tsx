'use client'

import { useEffect, useMemo, useState } from 'react'

import { Container, FormPane, CodePane } from '@/styles/pages/contactMe'
import SideNav from '@/components/organisms/SideNav'
import ContactForm from '@/components/organisms/ContactForm'
import Accordion from '@/components/molecules/Accordion'
import CodePreview from '@/components/molecules/CodePreview'
import SideLink from '@/components/molecules/SideLink'
import { useContactForm } from '@/hooks/useContactForm'
import { buildMessageCode, contactChannels, socialLinks } from './_data'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
}

/** pt-BR gives "dom., 06 de set." — trim it to the code-literal "dom 06 set". */
function today(): string {
  return new Intl.DateTimeFormat('pt-BR', DATE_FORMAT)
    .format(new Date())
    .replace(/\.|,/g, '')
    .replace(/\sde\s/g, ' ')
    .trim()
}

export default function ContactMe() {
  const form = useContactForm()

  // Resolved after mount: formatting on the server would depend on its locale
  // and clock, which is exactly the kind of mismatch hydration complains about.
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(today())
  }, [])

  const lines = useMemo(
    () => buildMessageCode(form.values, date),
    [form.values, date]
  )

  return (
    <Container>
      <SideNav>
        <Accordion title="contatos">
          {contactChannels.map((channel) => (
            <SideLink
              key={channel.id}
              href={channel.href}
              label={channel.label}
              icon={channel.icon}
              external={channel.external}
            />
          ))}
        </Accordion>

        <Accordion title="encontre-me-também-em">
          {socialLinks.map((link) => (
            <SideLink
              key={link.id}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </Accordion>
      </SideNav>

      <FormPane>
        <ContactForm form={form} />
      </FormPane>

      <CodePane>
        <CodePreview lines={lines} label="prévia da mensagem em código" />
      </CodePane>
    </Container>
  )
}
