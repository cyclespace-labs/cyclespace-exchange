'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TopLosers() {
  return (
    <div className='flex flex-col gap-1 p-5  w-full h-full overflow-hidden bg-gradient-to-r from-lime-600 to-teal-500 rounded-2xl justify-between ' >
      <div className='w-full h-full rounded-2xl gap-1 flex flex-col text-left '>
        
      <h1 className='font-bold text-2xl'>
          Elevate your Trading Sessions 
        </h1>

        <p className='font-normal text-[15px] text-zinc-200' >
          Sign up to access our brand new AI analysis tools!!
        </p>

      </div>
      <div className="w-full  gap-2 flex flex-row full">
        
      <div className='bg-lime-800/70 w-full h-12 p-2 rounded-full items-center justify-center flex'>
          Connect wallet
        </div>
        <div className='bg-teal-800/50 w-full h-12 p-2 rounded-full items-center justify-center flex'>
            Login 
        </div>
      </div>
      
    </div>
  );
}