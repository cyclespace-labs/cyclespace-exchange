
import type { Metadata } from 'next'
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from './providers'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from './../components/theme-provider';
import './globals.css';
import { SWRConfig } from 'swr'
import fetcher from '@/src/utils/fetcher';
import React from 'react';


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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers >
            <SWRConfig value={{
              fetcher,
              dedupingInterval: 60000, // 1 minute
              revalidateOnFocus: true,
              revalidateOnReconnect: true,
              refreshInterval: 300000 // 5 minutes
            }}>
              {children}
            </SWRConfig>
          </Providers>
        </ThemeProvider>
              
      </body>
    </html>
  )
}

export default RootLayout;
