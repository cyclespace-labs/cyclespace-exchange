import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TokenChart } from '@/components/TokenChart';
import { HeroSection } from '@/components/HeroSection';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { TokenPrice } from '@/components/TokenPrice';


export default function Home() {
  
  return (
    <main className='h-full w-full '>

        <div className='w-full flex md:mt-2'>
            <NavBar/>
          </div>

          <div className=''>
            <HeroSection/>
          </div>

        <div className='justify-center items-center'>
          <div className='w-full h-full justify-center items-center grid grid-cols-4 px-20'>

            <div className='px-5 py-10'>
              <TokenChart tokenId="bitcoin"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="solana"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="cardano"/>
            </div>

            <div className='px-5 py-10'>
              <TokenChart tokenId="ethereum"/>
            </div>

          </div>

          <div className='w-full h-full justify-center items-center grid grid-cols-6 px-20'>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="ripple" />
            </div>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="stellar" />
            </div>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="tron" />
            </div>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="dogecoin" />
            </div>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="sui" />
            </div>

            <div className='px-5 py-10'>
              <TokenPrice tokenId="hedera" />
            </div>

          </div>
        </div>


    </main>
  )
}
