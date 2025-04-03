"use client"

import { NavBar } from '@/components/Navigation/NavBar'
import { Ticker} from '@/components/Ticker'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Widget } from '@/components/Widget/Widget'
import { WidgetEvents } from '@/components/Widget/WidgetEvents'
import React from 'react'
import { motion } from 'motion/react';

export default function Swap() {
  return (
    <main className=''>
      <AuroraBackground>
        
        <div className='w-full flex md:mt-2'>
            <NavBar/>
        </div>

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=""
      >
        <div className='bg-none justify-center items-center h-fit w-full flex flex-col'> 

          <div className='mb-10 md:mt-4 w-[1000px] justify-center items-center'>
            <Ticker/>
          </div>
          
          <div className='h-fit bg-none flex w-full'>
            <Widget />
            <WidgetEvents />
          </div>

        </div>

      </motion.div>

      </AuroraBackground>
    </main>
  )
}
