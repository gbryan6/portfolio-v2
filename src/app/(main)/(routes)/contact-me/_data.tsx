import type { IconType } from 'react-icons'
import { MdMailOutline } from 'react-icons/md'
import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri'

import type { CodeLine } from '@/components/molecules/CodePreview'
import type { IContactValues } from '@/hooks/useContactForm'

export interface IContactLink {
  id: string
  label: string
  href: string
  icon: IconType
  external?: boolean
}

/** Public channels only — nothing private is committed to the repo. */
export const contactChannels: IContactLink[] = [
  {
    id: 'email',
    label: 'gabrielsalmi2011@gmail.com',
    href: 'mailto:gabrielsalmi2011@gmail.com',
    icon: MdMailOutline,
    external: false,
  },
]

export const socialLinks: IContactLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/gbryan6',
    icon: RiGithubFill,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gabriel-bryan-241078194/',
    icon: RiLinkedinBoxFill,
  },
]

/** Quoted + escaped, then trimmed to keep the preview on one line. */
function literal(value: string, max = 26): string {
  const flat = value.replace(/\s+/g, ' ').trim()
  const clipped = flat.length > max ? `${flat.slice(0, max)}…` : flat
  return JSON.stringify(clipped)
}

/**
 * The right-hand pane: the form's own state rendered as the object it will
 * POST. Rebuilt on every keystroke, so it stays a plain pure function.
 */
export function buildMessageCode(
  values: IContactValues,
  date: string
): CodeLine[] {
  const entry = (key: string, value: string, last = false): CodeLine => [
    { text: '  ' + key, color: 'fontSecondary' },
    { text: ': ', color: 'fontPrimary' },
    { text: literal(value), color: 'codeString' },
    { text: last ? '' : ',', color: 'fontPrimary' },
  ]

  return [
    [
      { text: 'const', color: 'codeEntity' },
      { text: ' button ', color: 'codeString' },
      { text: '= ', color: 'fontPrimary' },
      { text: 'document', color: 'fontSecondary' },
      { text: '.', color: 'fontPrimary' },
      { text: 'querySelector', color: 'accent' },
      { text: '(', color: 'fontPrimary' },
      { text: "'#submit-message'", color: 'highlight' },
      { text: ')', color: 'fontPrimary' },
    ],
    [],
    [
      { text: 'const', color: 'codeEntity' },
      { text: ' message ', color: 'codeString' },
      { text: '= {', color: 'fontPrimary' },
    ],
    entry('name', values.name),
    entry('email', values.email),
    entry('message', values.message),
    entry('date', date, true),
    [{ text: '}', color: 'fontPrimary' }],
    [],
    [
      { text: 'button', color: 'codeString' },
      { text: '.', color: 'fontPrimary' },
      { text: 'addEventListener', color: 'accent' },
      { text: '(', color: 'fontPrimary' },
      { text: "'click'", color: 'highlight' },
      { text: ', () ', color: 'fontPrimary' },
      { text: '=>', color: 'codeEntity' },
      { text: ' {', color: 'fontPrimary' },
    ],
    [
      { text: '  form', color: 'codeString' },
      { text: '.', color: 'fontPrimary' },
      { text: 'send', color: 'accent' },
      { text: '(', color: 'fontPrimary' },
      { text: 'message', color: 'fontSecondary' },
      { text: ')', color: 'fontPrimary' },
    ],
    [{ text: '})', color: 'fontPrimary' }],
  ]
}
