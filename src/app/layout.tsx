import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lit Feed!',
  description: 'Yet another feed reader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full dark:bg-gray-900 bg-white">
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  )
}
