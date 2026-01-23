import React from "react"
import type { Metadata } from 'next'
import { Crimson_Text, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const serif = Crimson_Text({ weight: ['400', '600', '700'], subsets: ['latin'] });
const sans = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Markets | Prediction Protocol',
  description: 'Where collective intelligence discovers truth through belief markets on Solana.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ '--font-sans': sans.style.fontFamily, '--font-serif': serif.style.fontFamily } as React.CSSProperties}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
