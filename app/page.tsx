import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TokenChart } from '@/components/TokenChart';
import { HeroSection } from '@/components/HeroSection';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';


export default function Home() {
  
  return (
    <main className='h-full w-full'>

        <div className='w-full flex md:mt-2'>
            <NavBar/>
          </div>

          <div className=''>
            <HeroSection/>
          </div>

          <div className='w-full h-full justify-center items-center flex'>

            <div className='px-5 py-10'>
              <TokenChart tokenId="bitcoin"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="solana"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="dai"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="avax"/>
            </div>

          </div>

    </main>
  )
}
