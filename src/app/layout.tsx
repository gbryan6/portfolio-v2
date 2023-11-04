import { Fira_Code as FiraCode } from 'next/font/google'
import GlobalStyles from '@/styles/GlobalStyles'
import Providers from '@/hooks/Providers'


const firaCode = FiraCode({
  weight: ['300', '400', '500', '700'],
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
          {children}
        </Providers>
      </body>
    </html>
  )
}
