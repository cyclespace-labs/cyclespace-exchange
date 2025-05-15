'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { COINGECKO_IDS } from "@/lib/constants";

interface MarketStatsProps {
  tokenSymbol: string;
  chainId?: number;
}

interface MarketData {
  volume24h: number;
  marketCap: number;
  fdv: number;
  circulatingSupply: number;
  holders?: number;
  liquidity?: number;
}


export default function MarketStats({ tokenSymbol }: MarketStatsProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true);
      setError(null);

      

      const coingeckoId = COINGECKO_IDS[tokenSymbol.toLowerCase()];
      if (!coingeckoId) {
        setError('Token not supported');
        setIsLoading(false);
        return;
      }

      try {

        
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        const headers: HeadersInit = {};
        if (apiKey) {
          headers["x-cg-demo-api-key"] = apiKey;
        }
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}`, { headers });

        if (!res.ok) throw new Error('Failed to fetch market data');

        const data = await res.json();
        const marketData: MarketData = {
          volume24h: data.market_data.total_volume.usd,
          marketCap: data.market_data.market_cap.usd,
          fdv: data.market_data.current_price.usd * data.market_data.total_supply,
          circulatingSupply: data.market_data.circulating_supply,
        };

        setMarketData(marketData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }


    };

    fetchMarketData();
  }, [tokenSymbol]);

  if (isLoading) {
    return (
      <div className="grid grid-row-2 gap-1 p-3 px-5 py-5 w-full h-full overflow-hidden bg-zinc-900 rounded-2xl">
        <div className="w-full h-full rounded-2xl gap-1 flex flex-row justify-between items-center">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="w-full gap-1 h-full justify-center items-center flex flex-row">
          <div className="flex flex-col gap-1 w-full h-full">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
          <div className="flex flex-col gap-1 w-full h-full">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
          <div className="flex flex-col gap-1 w-full h-full">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-row-2 gap-1 p-3 px-5 py-5 w-full h-full overflow-hidden bg-zinc-900 rounded-2xl">
        <h1 className="text-zinc-300 font-bold text-[16px]">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-row-2 gap-1 p-3 px-5 py-5 w-full h-full overflow-hidden dark:bg-zinc-900 bg-white rounded-2x shadow rounded-2xl">
      <div className="w-full h-full rounded-2xl gap-1 flex flex-row justify-between items-center">
        <h1 className="text-zinc-300 font-bold text-[16px]">
          Market stats for {tokenSymbol.toUpperCase()}
        </h1>
      </div>
      <div className="w-full gap-1 h-full justify-center items-center flex flex-row">
        <div className="flex flex-col gap-1 w-full h-full">
          <StatItem title="Volume (24h)" value={marketData?.volume24h} isCurrency={true} />
          <StatItem title="Market Cap" value={marketData?.marketCap} isCurrency={true} />
        </div>
        <div className="flex flex-col gap-1 w-full h-full">
          <StatItem title="FDV" value={marketData?.fdv} isCurrency={true} />
          <StatItem title="Circulating Supply" value={marketData?.circulatingSupply} isCurrency={false} />
        </div>
      </div>
    </div>
  );
}

function StatItem({ title, value, isCurrency }: { title: string; value: number | undefined; isCurrency: boolean }) {
  return (
    <div className="w-full h-20 p-2 rounded-2xl justify-start flex flex-col text-start">
      <h1 className="text-[13px] text-start font-medium text-zinc-400">{title}</h1>
      <h2 className="text-[15px] text-start font-semibold">
        {value !== undefined
          ? isCurrency
            ? `$${value.toLocaleString()}`
            : value.toLocaleString()
          : 'N/A'}
      </h2>
    </div>
  );
}