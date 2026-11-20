import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ever After Weddings — More Than A Wedding',
  description: 'Wedding planning and design for celebrations in Mumbai, Bahrain and beyond.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
