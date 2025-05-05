"use client"

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function GlobalTotal() {
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        if (!apiKey) throw new Error("CoinGecko API key is missing");

        const response = await fetch("https://api.coingecko.com/api/v3/global", {
          headers: { "x-cg-demo-api-key": apiKey }
        });
        if (!response.ok) throw new Error("Failed to fetch global data");

        const data = await response.json();
        const globalData = data.data;

        setMarketCap(globalData.total_market_cap.usd);
        setVolume(globalData.total_volume.usd);
        setPercentageChange(globalData.market_cap_change_percentage_24h_usd);
      } catch (err) {
        console.error(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchGlobalData();
  }, []);

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  return (
    <div className='grid grid-row-2 gap-2 p-3 w-full h-full'>
      <div className='w-full h-full p-4 gap-2 flex flex-row justify-between items-center'>
        <div className='w-full h-full gap-2 flex flex-col'>
          <div className='flex flex-row gap-2 items-center'>
            <h1 className='text-zinc-300 font-normal text-[14px]'>Market Cap</h1>
            {percentageChange !== null && (
              <h1 className={`flex flex-row items-center gap-1 text-[14px] font-medium ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {percentageChange >= 0 ? <ArrowUp width={15} height={15} /> : <ArrowDown width={15} height={15} />}
                {Math.abs(percentageChange).toFixed(2)}%
              </h1>
            )}
          </div>
          <h1 className='text-[22px] font-medium text-zinc-100'>
            {marketCap !== null ? `$${formatLargeNumber(marketCap)}` : 'Loading...'}
          </h1>
        </div>
        <div className='w-full h-full'>
          {/* Placeholder for future chart */}
        </div>
      </div>
      <div className='w-full h-full rounded-2xl p-4 gap-2 flex flex-col'>
        <div className='flex flex-row gap-4'>
          <h1 className='text-zinc-300 font-normal text-[14px]'>24h Trading Volume</h1>
        </div>
        <h1 className='text-[22px] font-medium text-zinc-100'>
          {volume !== null ? `$${formatLargeNumber(volume)}` : 'Loading...'}
        </h1>
      </div>
    </div>
  );
}
