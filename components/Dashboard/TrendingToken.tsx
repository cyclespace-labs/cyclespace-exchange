'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Piechart } from './Pie-Chart';

export default function TrendingTokens() {
  return (
    <div className='grid grid-row-2 gap-2 p-3 px-5 w-full h-fit overflow-hidden'>
      <div className='w-full h-full rounded-2xl gap-2 flex flex-row justify-between items-center'>
        <h1 className='text-zinc-300 font-medium text-[14px]'>Chains</h1>
        <Button variant={'ghost'} className='bg-none font-normal text-[14px] items-center flex flex-row gap-1'>View More <ArrowRight width={15} height={15}/></Button>
      </div>
        <div className="w-full gap-2 h-full justify-center items-center flex flex-col">

        <div className="flex flex-row gap-2 w-full h-full">
          <div className='bg-zinc-800 w-full h-20 p-2 rounded-2xl items-center justify-center flex'>
                  
            </div>
            <div className='bg-zinc-800 w-full h-20 p-2 rounded-2xl items-center justify-center flex'>

            </div>
        </div>

        
          <div className="flex flex-row gap-2 w-full h-full">
            <div className='bg-zinc-800 w-full h-20 p-2 rounded-2xl items-center justify-center flex'>
    
            </div>
            <div className='bg-zinc-800 w-full h-20 p-2 rounded-2xl items-center justify-center flex'>

            </div>
          </div>

        </div>
      
    </div>
  );
}