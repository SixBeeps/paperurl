import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ipm = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: 'paperurl',
  description: 'Simple, accountless URL shortener',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ipm.className}>{children}</body>
    </html>
  )
}
