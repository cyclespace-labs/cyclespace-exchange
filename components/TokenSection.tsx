"use client"

import React from 'react'
import { TokenChart } from './TokenChart'

export default function TokenSection() {
  return (
    <div className='justify-center items-center w-full mt-5'>
        <div className='text-white font-medium'>
            <p>Trending Tokens</p>
        </div>
        <div className='w-full h-full justify-center items-center gap-3 grid grid-cols-4 px-0'>
            <div className='py-5 w-full'>
              <TokenChart tokenId="bitcoin" delay={0}/>
            </div>

            <div className='py-5 w-full'>
              <TokenChart tokenId="solana" delay={1000}/>
            </div>

            <div className='py-5 w-full'>
              <TokenChart tokenId="cardano" delay={2000}/>
            </div>

            <div className='py-5 w-full'>
              <TokenChart tokenId="ethereum" delay={3000}/>
            </div>
        </div>
    </div>
  )
}
