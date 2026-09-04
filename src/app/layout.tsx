import { Fira_Code as FiraCode } from 'next/font/google'
import { cookies } from 'next/headers'
import Providers from '@/hooks/Providers'
import type { ThemeName } from '@/hooks/Theme'

export const dynamic = 'force-dynamic'
const THEME_COOKIE = 'theme'

const firaCode = FiraCode({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Gabriel Bryan | Dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Seed the theme from the cookie so SSR paints the right palette — no flash
  // for returning light-mode visitors.
  const cookieTheme = cookies().get(THEME_COOKIE)?.value
  const initialThemeName: ThemeName = cookieTheme === 'light' ? 'light' : 'dark'

  return (
    <html
      lang="en"
      className={`${firaCode.variable}`}
      data-theme={initialThemeName}
    >
      <body>
        <Providers initialThemeName={initialThemeName}>{children}</Providers>
      </body>
    </html>
  )
}
