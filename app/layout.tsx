import './globals.css'
import type { Metadata } from 'next'
import Header from './components/header'

export const metadata: Metadata = {
  title: 'Premium',
  description: 'Gro Premium',
}

export const viewportMeta = (
  <meta
    name="viewport"
    content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no"
  />
);
export default function RootLayout({

  children,
}: {
  children: React.ReactNode
  }) {

  return (
    <html lang="en">
      <body className='h-100vh overflow-hidden'>
        <Header />
        {children}
        {viewportMeta}
        </body>
    </html>
  )
}
