"use client"

import React from 'react';
import { ChainList } from './ChainsList';

export default function ChainSection() {
  return (
    <div className='justify-center items-center w-full mt-5'>
        <div className='dark:text-white/80 text-gray-800 font-semibold text-[20px]'>
            <p>Popular Chains</p>
        </div>
        <div className='w-full h-full justify-center items-center gap-3 grid grid-cols-5 px-0'>
            <div className='py-5 w-full'>
              <ChainList tokenId="bitcoin" delay={500}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="solana" delay={1000}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="cardano" delay={1500}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="ethereum" delay={2000}/>
            </div>
            <div className='py-5 w-full'>
              <ChainList tokenId="raydium" delay={2500}/>
            </div>
            
        </div>
        <div className='w-full h-full justify-center items-center gap-3 grid grid-cols-5 px-0'>
            <div className='py-5 w-full'>
              <ChainList tokenId="bitcoin" delay={500}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="solana" delay={1000}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="cardano" delay={1500}/>
            </div>

            <div className='py-5 w-full'>
              <ChainList tokenId="ethereum" delay={2000}/>
            </div>
            <div className='py-5 w-full'>
              <ChainList tokenId="raydium" delay={2500}/>
            </div>
            
        </div>
    </div>
  )
}
