import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { WikiShell } from '@/components/wiki/WikiShell'

export const metadata: Metadata = {
  title: 'Wikipédia, slobodná encyklopédia',
  description: 'Wikipédia je slobodná online encyklopédia, ktorú vytvára a upravuje komunita dobrovoľníkov z celého sveta.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className="bg-white">
      <body className="antialiased min-h-screen bg-white">
        <WikiShell>{children}</WikiShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
