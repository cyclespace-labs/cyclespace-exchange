import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Roboto } from 'next/font/google'
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from '@/context/ThemeContext'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  
})

export const metadata: Metadata = {
  title: 'Cyclespace Markets',
  description: 'The Best Cross-Swap Exchange',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased w-full `}>
        <ThemeProvider>
                      <Providers >
            {children}
          </Providers>
        </ThemeProvider>
              
      </body>
    </html>
  )
}

export default RootLayout;
