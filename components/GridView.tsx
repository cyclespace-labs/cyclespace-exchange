"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { IconSwitch2 } from '@tabler/icons-react';

export default function GridView() {
  return (
    <div>
        <div className='w-full h-full grid grid-rows-2 gap-3'>
            <div className='w-full h-fit bg-white 
                dark:bg-gray-950 rounded-t-4xl rounded-b-2xl 
                shadow-gray-300 dark:shadow-gray-800 shadow-2xl 
                p-15 justify-between items-center grid grid-cols-2 '
                > 

                <div className='grid grid-rows-3 w-full' >
                    <h1 className='text-4xl font-bold text-gray-800 dark:text-white w-[350px]'>
                        More than 130+ liquidity sources
                    </h1>
                    <h2 className='text-lg font-semibold text-gray-600 dark:text-white/80 mt-2 w-[380px]'>
                        Zero fee trades on 9+ million tokens across 13 chains. Get the best prices by tapping into 130+ liquidity sources.
                    </h2>
                    <Button className='rounded-full text-black bg-[#BAFD02] px-3 md:px-4 text-sm md:text-base mt-5 w-fit'>
                        Learn More
                    </Button>
                </div>
                <div className='w-full h-full bg-black'>

                </div>
            </div>
            <div className='w-full h-fit grid grid-cols-3 gap-3'> 

                <div className='bg-white w-full h-fit grid grid-cols-2 rounded-b-4xl rounded-t-2xl justify-center items-center shadow-gray-300 shadow-2xl dark:bg-gray-950 dark:shadow-gray-800 p-10'>
                    
                    <div className='grid grid-rows-2 w-full h-full'>
                        <h2 className='text-lg font-semibold text-gray-600 dark:text-white/80 mt-2 w-full'>
                            Swap. Zero fee trades on 9+ million tokens across 13 chains.
                        </h2>
                        <Button className='rounded-full text-black bg-[#BAFD02] px-3 md:px-4 text-sm md:text-base mt-5 w-fit'>
                            Learn More
                        </Button>
                    </div>

                    <div className='w-fit h-fit p-10 items-center justify-center flex-1'>
                        <div className='rounded-full bg-gray-400 w-35 h-35 flex items-center justify-center'>
                            <div className='rounded-full bg-gray-500 w-30 h-30 flex items-center justify-center'>
                                <div className='rounded-full bg-gray-600 w-25 h-25 flex items-center justify-center'>
                                    <div className='rounded-full bg-gray-700 w-20 h-20 flex items-center justify-center'>
                                        <IconSwitch2 color='white' height={30} width={30}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='bg-white w-full h-fit grid grid-cols-2 rounded-b-4xl rounded-t-2xl justify-center items-center shadow-gray-300 shadow-2xl dark:bg-gray-950 dark:shadow-gray-800 p-10'>
                    
                    <div className='grid grid-rows-2 w-full h-full'>
                        <h2 className='text-lg font-semibold text-gray-600 dark:text-white/80 mt-2 w-full'>
                            Cross chain swaps. Trade seamlessly across chains.
                        </h2>
                        <Button className='rounded-full text-black bg-[#BAFD02] px-3 md:px-4 text-sm md:text-base mt-5 w-fit'>
                            Learn More
                        </Button>
                    </div>

                    <div className='w-fit h-fit p-10 items-center justify-center flex-1'>
                        <div className='rounded-full bg-gray-400 w-35 h-35 flex items-center justify-center'>
                            <div className='rounded-full bg-gray-500 w-30 h-30 flex items-center justify-center'>
                                <div className='rounded-full bg-gray-600 w-25 h-25 flex items-center justify-center'>
                                    <div className='rounded-full bg-gray-700 w-20 h-20 flex items-center justify-center'>
                                        <IconSwitch2 color='white' height={30} width={30}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='bg-white w-full h-fit grid grid-cols-2 rounded-b-4xl rounded-t-2xl justify-center items-center shadow-gray-300 shadow-2xl dark:bg-gray-950 dark:shadow-gray-800 p-10'>
                    
                    <div className='grid grid-rows-2 w-full h-full'>
                        <h2 className='text-lg font-semibold text-gray-600 dark:text-white/80 mt-2 w-full'>
                            Swap. Zero fee trades on 9+ million tokens across 13 chains.
                        </h2>
                        <Button className='rounded-full text-black bg-[#BAFD02] px-3 md:px-4 text-sm md:text-base mt-5 w-fit'>
                            Learn More
                        </Button>
                    </div>

                    <div className='w-fit h-fit p-10 items-center justify-center flex-1'>
                        <div className='rounded-full bg-gray-400 w-35 h-35 flex items-center justify-center'>
                            <div className='rounded-full bg-gray-500 w-30 h-30 flex items-center justify-center'>
                                <div className='rounded-full bg-gray-600 w-25 h-25 flex items-center justify-center'>
                                    <div className='rounded-full bg-gray-700 w-20 h-20 flex items-center justify-center'>
                                        <IconSwitch2 color='white' height={30} width={30}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
  )
}
