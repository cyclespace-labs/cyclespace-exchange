"use client"

import { NavBar } from '@/components/Navigation/NavBar'
import { Ticker} from '@/components/Ticker'
import { Widget } from '@/components/Widget/Widget'
import { WidgetEvents } from '@/components/Widget/WidgetEvents'
import React from 'react'
import { motion } from 'motion/react';
import { FullChart } from '@/components/FullChart'
import { TokenDashboard } from '@/components/Widget/TokenDashboard'
import { Providers } from '../providers'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'



export default function Swap() {
  return (
    <Providers>
      <AppRouterCacheProvider>
        
        <main className='justify-center items-center h-full w-full flex flex-col'>
            
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
            className="w-[1400px] items-center justify-center h-full flex flex-col"
          >
            <div className='justify-center items-center h-full w-full flex flex-col'> 

              <div className='mt-6 mb-8 h-full w-full justify-center items-center'>
                <Ticker/>
              </div>
              
              <div className='h-full w-full grid grid-flow-col justify-center items-center gap-3'>

                <div className='min-h-[567px] h-full min-w-[1000px] w-full'>
                  <FullChart tokenId="bitcoin" delay={500}/>
                </div>

                <div className='h-full w-fit'>
                  <Widget />
                  <WidgetEvents />
                </div>

              </div>

            </div>

          </motion.div>
        </main>

      </AppRouterCacheProvider>
    </Providers>
  )
}
