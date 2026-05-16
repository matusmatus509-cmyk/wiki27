import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
