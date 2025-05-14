'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Piechart } from './Pie-Chart';

export default function MarketStats() {
  return (
    <div className='grid grid-row-2 gap-1 p-3 px-5 py-5 w-full h-full overflow-hidden bg-zinc-900 rounded-2xl'>
      <div className='w-full h-full rounded-2xl gap-1 flex flex-row justify-between items-center'>
        <h1 className='text-zinc-300 font-bold text-[16px]'>Market stats</h1>
      </div>
        <div className="w-full gap-1 h-full justify-center items-center flex flex-row">

        <div className="flex flex-col gap-1 w-full h-full items-center">
          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>Volume (24h)</h1>
                  <h2 className='text-[15px] text-start font-semibold'>$37.9B</h2>
            </div>

          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>Market Cap</h1>
                  <h2 className='text-[15px] text-start font-semibold'>$266.89B</h2>
            </div>
        </div>

        <div className="flex flex-col gap-1 w-full h-full">
          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>FDV</h1>
                  <h2 className='text-[15px] text-start font-semibold'>$266.9B</h2>
            </div>
          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>Holders</h1>
                  <h2 className='text-[15px] text-start font-semibold'>259k</h2>
            </div>
        </div>

                <div className="flex flex-col gap-1 w-full h-full">
          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>Liquidity</h1>
                  <h2 className='text-[15px] text-start font-semibold'>$67.46M</h2>
            </div>
          <div className='w-full h-20 p-2 rounded-2xl  justify-start flex flex-col text-start'>
                  <h1 className='text-[13px] text-start font-medium text-zinc-400'>Circulating Supply</h1>
                  <h2 className='text-[15px] text-start font-semibold'>120.73M</h2>
            </div>
        </div>

        </div>
      
    </div>
  );
}

