"use client"

import React from 'react'
import { TokenChart } from './TokenChart'

export default function TokenSection() {
  return (
    <div className='justify-center items-center w-full mt-5 bg-auto'>

        <div className='dark:text-white/80 text-gray-800 font-semibold text-[20px]'>
            <p>Trending Tokens</p>
        </div>

        <div className='w-full h-full justify-center items-center gap-3 grid grid-cols-5 '>

            <div className='py-5 w-full h-full'>
              <TokenChart tokenId="bitcoin" delay={500}/>
            </div>

            <div className='py-5 w-full h-full'>
              <TokenChart tokenId="solana" delay={1000}/>
            </div>

            <div className='py-5 w-full h-full'>
              <TokenChart tokenId="cardano" delay={1500}/>
            </div>

            <div className='py-5 w-full h-full'> 
              <TokenChart tokenId="ethereum" delay={2000}/>
            </div>
            <div className='py-5 w-full h-full'>
              <TokenChart tokenId="raydium" delay={2500}/>
            </div>

        </div>

    </div>
  )
}
