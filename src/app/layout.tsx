import { Fira_Code as FiraCode } from 'next/font/google'
import GlobalStyles from '@/styles/GlobalStyles'
import Providers from '@/hooks/Providers'


const firaCode = FiraCode({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${firaCode.variable}`}>
      <body>
        <Providers>
          <GlobalStyles />
          {children}
        </Providers>
      </body>
    </html>
  )
}
