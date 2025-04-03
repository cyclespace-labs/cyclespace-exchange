import React from 'react';
import { NavBar } from '@/components/Navigation/NavBar'
import { AuroraBackground } from '@/components/ui/aurora-background';


export default function Home() {
  
  return (
    <main className='bg-none'>
      <AuroraBackground>
        <div className='w-full flex md:mt-2'>
          <NavBar/>
        </div>

        <div>
          <div >

          </div>
        </div>
      </AuroraBackground>
    </main>
  )
}
