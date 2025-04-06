import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TokenChart } from '@/components/TokenChart';
import { HeroSection } from '@/components/HeroSection';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { TokenPrice } from '@/components/TokenPrice';
import TokenSection from '@/components/TokenSection';


export default function Home() {
  
  return (
    <main className='h-full w-full justify-center items-center flex flex-col '>

        <div className='w-full flex md:mt-2'>
            <NavBar/>
          </div>

        <div className='justify-center items-center flex flex-col bg-none w-[1500px] gap-5'> 

          <div className='w-full'>
            <HeroSection/>
          </div>

          <div className='justify-center items-center flex flex-col'>

            <div className='w-full'>
              <TokenSection/>
            </div>

            <div className='w-full h-full justify-center items-center grid grid-cols-4 px-20'>
              <div className='px-5 py-10'>
                <TokenPrice tokenId="bitcoin" delay={0}/>
              </div>
              <div className='px-5 py-10'>
                <TokenPrice tokenId="ethereum" delay={1000}/>
              </div>
              <div className='px-5 py-10'>
                <TokenPrice tokenId="cardano" delay={3000}/>
              </div>
              <div className='px-5 py-10'>
                <TokenPrice tokenId="solana" delay={3000}/>
              </div>
            </div>

          </div>
        </div> 

    </main>
  )
}
