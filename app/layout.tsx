
import type { Metadata } from 'next'
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from './providers'
import { Poppins, Roboto } from 'next/font/google'
import { ThemeProvider } from './../components/theme-provider';
import './globals.css';
import { SWRConfig } from 'swr'
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  
})

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
      <body className={`${poppins.className} antialiased w-full `}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers >
              {children}
          </Providers>
        </ThemeProvider>
              
      </body>
    </html>
  )
}

export default RootLayout;
