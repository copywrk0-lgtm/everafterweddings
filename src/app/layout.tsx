import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://everafterweddings-five.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ever After Weddings — More Than A Wedding',
    template: '%s — Ever After Weddings',
  },
  description: 'Intuitive wedding planning and design for celebrations in Mumbai, Bahrain and beyond.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Ever After Weddings',
    title: 'Ever After Weddings — More Than A Wedding',
    description: 'Intuitive wedding planning and design for celebrations in Mumbai, Bahrain and beyond.',
    images: [{ url: '/images/0002-d2a5b732.webp', width: 1200, height: 1500, alt: 'Ever After Weddings celebration' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ever After Weddings — More Than A Wedding',
    description: 'Intuitive wedding planning and design for celebrations in Mumbai, Bahrain and beyond.',
    images: ['/images/0002-d2a5b732.webp'],
  },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
