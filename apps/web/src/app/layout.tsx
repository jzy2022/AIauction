import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Auction - Digital Human Live Stream Auctions',
  description: 'Experience the future of auctions with AI-powered digital humans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}