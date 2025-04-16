import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Inter, } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { NavBar } from '@/components/Navigation/NavBar'
import { Titillium_Web } from 'next/font/google'
import { ThemeProvider } from './../context/ThemeContext';
import { Lato } from 'next/font/google'
import { Roboto } from 'next/font/google'


const roboto = Roboto({
  subsets: ['latin'],
  weight: '600',
  
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
      <body className={`${roboto.className} antialiased bg-gray-100 dark:bg-gray-900`}>

 
            <ThemeProvider>
              {children}
            </ThemeProvider>



      </body>
    </html>
  )
}
