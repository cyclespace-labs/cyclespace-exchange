import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Inter, } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { NavBar } from '@/components/Navigation/NavBar'
import { Titillium_Web } from 'next/font/google'


const titillium_web = Titillium_Web({
  subsets: ['latin'],
  weight: '400',
  
})

export const metadata: Metadata = {
  title: 'Cyclespace Markets',
  description: 'The Best Cross-Swap Exchange',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${titillium_web.className} antialiased bg-black`}>

        <Providers>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </Providers>

      </body>
    </html>
  )
}
