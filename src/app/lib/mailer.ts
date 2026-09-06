import nodemailer, { type Transporter } from 'nodemailer'

/**
 * SMTP transport for the /fale-comigo form. Everything comes from env — no
 * credential ever lands in the repo. See .env.example for the expected keys.
 */

const REQUIRED = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'CONTACT_TO',
] as const

export interface IMailConfig {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  to: string
  from: string
}

export class MailConfigError extends Error {}

export function readMailConfig(): IMailConfig {
  const missing = REQUIRED.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new MailConfigError(`missing env: ${missing.join(', ')}`)
  }

  const port = Number(process.env.SMTP_PORT)

  if (!Number.isInteger(port) || port <= 0) {
    throw new MailConfigError('SMTP_PORT must be a positive integer')
  }

  return {
    host: process.env.SMTP_HOST as string,
    port,
    // 465 is implicit TLS; everything else negotiates STARTTLS.
    secure: port === 465,
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASSWORD as string,
    to: process.env.CONTACT_TO as string,
    from: process.env.CONTACT_FROM ?? (process.env.SMTP_USER as string),
  }
}

// Built once per server process — nodemailer pools connections internally.
let transporter: Transporter | null = null

export function getTransporter(config: IMailConfig): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.password },
    })
  }

  return transporter
}
