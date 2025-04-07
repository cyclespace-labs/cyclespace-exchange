"use client"
import Link from 'next/link'
import React from 'react'



export default function Footer() {
  return (
    <div className='py-10 grid grid-cols-5 w-full h-full gap-10 justify-start items-start'>
        <div className='justify-between flex flex-col w-full h-full'>
            <h1 className=' text-white font-semibold'>
                CYCLESPACE EXCHANGE
            </h1>
            <h1 className=' text-white/80 font-semibold'>
                Powered by Li.fi
            </h1>
        </div>

        <div className='justify-between gap-5 flex flex-col w-full'>
            <div>
                <h1 className='text-white font-semibold '>
                    Learn
                </h1>
            </div>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Swap Tokens
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Cross chain
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    News
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Company
                </h1>
            </Link>
        </div>

        <div className='justify-between gap-5 flex flex-col w-full'>
            <div>
                <h1 className='text-white font-semibold '>
                    Support
                </h1>
            </div>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Help Center
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Request a feature
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    FAQs
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Getting started
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Brand Assets
                </h1>
            </Link>
        </div>

        <div className='justify-between gap-5 flex flex-col w-full'>
            <div>
                <h1 className='text-white font-semibold '>
                    Legal
                </h1>
            </div>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Terms of Service
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Privacy
                </h1>
            </Link>
        </div>

        <div className='justify-between gap-5 flex flex-col w-full'>
            <div>
                <h1 className='text-white font-semibold '>
                    Community
                </h1>
            </div>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    X.com
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Instagram
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Discord
                </h1>
            </Link>
            <Link href={"/"} className='text-white/80 '>
                <h1 className='text-white/80'>
                    Youtube
                </h1>
            </Link>
        </div>
    </div>
  )
}
