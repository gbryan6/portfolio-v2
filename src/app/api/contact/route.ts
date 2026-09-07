import { NextResponse } from 'next/server'

import {
  MailConfigError,
  getTransporter,
  readMailConfig,
} from '@/app/lib/mailer'

// nodemailer needs Node APIs — this route can never run on the edge runtime.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LIMITS = { name: 80, email: 140, message: 2000 }
const MIN_MESSAGE = 10
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/*
 * One in-memory bucket per IP, reset with the server process. Enough to blunt
 * casual abuse of a personal site; put a real limiter in front if it ever
 * takes serious traffic.
 *
 * Only real send attempts are counted — rejected payloads cost nothing and
 * charging for them would lock someone out over three typos.
 */
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)
  return false
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Keeps a crafted value from injecting extra headers into the mail. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function renderHtml(name: string, email: string, message: string): string {
  return `<div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;line-height:1.6">
  <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
  <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  <hr />
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status })
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return bad('corpo da requisição inválido')
  }

  const { name, email, message, company } = (payload ?? {}) as Record<
    string,
    unknown
  >

  // Honeypot: only a bot fills a field that is hidden from the page.
  if (typeof company === 'string' && company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return bad('campos obrigatórios ausentes')
  }

  const cleanName = sanitizeHeader(name).slice(0, LIMITS.name)
  const cleanEmail = sanitizeHeader(email).slice(0, LIMITS.email)
  const cleanMessage = message.trim().slice(0, LIMITS.message)

  if (!cleanName) return bad('nome é obrigatório')
  if (!EMAIL_RE.test(cleanEmail)) return bad('e-mail inválido')
  if (cleanMessage.length < MIN_MESSAGE) return bad('mensagem muito curta')

  // Charged only now, once we know we are about to actually send something.
  if (isRateLimited(clientIp(request))) {
    return bad('muitas mensagens em pouco tempo — tenta de novo mais tarde', 429)
  }

  try {
    const config = readMailConfig()

    await getTransporter(config).sendMail({
      from: `"portfolio · fale-comigo" <${config.from}>`,
      to: config.to,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `[portfolio] nova mensagem de ${cleanName}`,
      text: `Nome: ${cleanName}\nE-mail: ${cleanEmail}\n\n${cleanMessage}`,
      html: renderHtml(cleanName, cleanEmail, cleanMessage),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof MailConfigError) {
      console.error('[contact] mail is not configured:', error.message)
      return bad('o envio ainda não está configurado neste ambiente', 503)
    }

    console.error('[contact] send failed:', error)
    return bad('não consegui enviar agora — tenta de novo em instantes', 502)
  }
}
