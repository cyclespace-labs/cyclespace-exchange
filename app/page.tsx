import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TokenChart } from '@/components/TokenChart';
import { HeroSection } from '@/components/HeroSection';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import TokenSection from '@/components/TokenSection';
import CardSection from '../components/ChainSection';
import ChainSection from '../components/ChainSection';


export default function Home() {
  
  return (
    <BackgroundGradientAnimation className='' >
    <main className='h-full w-full justify-center items-center flex flex-col bg-auto  scroll-auto'>
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

            <div className="w-full">
              <ChainSection/>
            </div>

          </div>
        </div> 
    </main>
    </BackgroundGradientAnimation>
  )
}
