'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { COINGECKO_IDS } from "@/src/constants";

interface MarketStatsProps {
  tokenSymbol: string;
  chainId?: number;
}

interface MarketData {
  volume24h: number;
  volume24hChange: number;
  marketCap: number;
  marketCapChange: number;
  fdv: number;
  fdvChange: number;
  circulatingSupply: number;
  circulatingSupplyChange: number;
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
        if (apiKey) headers["x-cg-demo-api-key"] = apiKey;

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}`, { headers });
        if (!res.ok) throw new Error('Failed to fetch market data');

        const data = await res.json();
        setMarketData({
          volume24h: data.market_data.total_volume.usd,
          volume24hChange: data.market_data.price_change_percentage_24h,
          marketCap: data.market_data.market_cap.usd,
          marketCapChange: data.market_data.market_cap_change_percentage_24h,
          fdv: data.market_data.current_price.usd * data.market_data.total_supply,
          fdvChange: data.market_data.price_change_percentage_24h,
          circulatingSupply: data.market_data.circulating_supply,
          circulatingSupplyChange: data.market_data.circulating_supply_change_24h || 0
        });
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
      <div className="grid grid-rows-2 gap-2 p-4 w-full bg-transparent rounded-2xl">
        <div className="w-full flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 w-full bg-zinc-900 rounded-2xl">
        <h1 className="text-white font-bold text-sm sm:text-base">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 w-full bg-transparent rounded-2xl">
      <h1 className="text-white font-semibold text-sm sm:text-base">
        Market stats for <span className="text-white">{tokenSymbol.toUpperCase()}</span>
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <StatItem 
            title="Volume (24h)" 
            value={marketData?.volume24h} 
            change={marketData?.volume24hChange}
            isCurrency={true} 
          />
          <StatItem 
            title="Market Cap" 
            value={marketData?.marketCap} 
            change={marketData?.marketCapChange}
            isCurrency={true} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <StatItem 
            title="FDV" 
            value={marketData?.fdv} 
            change={marketData?.fdvChange}
            isCurrency={true} 
          />
          <StatItem 
            title="Circulating Supply" 
            value={marketData?.circulatingSupply} 
            change={marketData?.circulatingSupplyChange}
            isCurrency={false} 
          />
        </div>
      </div>
    </div>
  );
}

function StatItem({ title, value, change = 0, isCurrency }: { 
  title: string; 
  value: number | undefined; 
  change?: number;
  isCurrency: boolean; 
}) {
  const formattedChange = Math.abs(change) > 0.01 ? change.toFixed(2) : change?.toFixed(2);
  const formattedValue = value ? 
    isCurrency
      ? `$${value.toLocaleString(undefined, { 
          maximumFractionDigits: value > 1000 ? 0 : 2,
          notation: value > 1e6 ? 'compact' : 'standard'
        })}`
      : value.toLocaleString(undefined, {
          notation: value > 1e6 ? 'compact' : 'standard',
          maximumFractionDigits: 0
        })
    : 'N/A';

  return (
    <div className="w-full h-20 p-3 rounded-2xl bg-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xs sm:text-[13px] font-medium text-zinc-400">{title}</h1>
        {change !== undefined && (
          <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-full flex flex-row ${
            change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {change >= 0 ? '' : ''} {formattedChange}%
          </span>
        )}
      </div>
      <h2 className="text-sm sm:text-[15px] font-semibold mt-1 truncate">
        {formattedValue}
      </h2>
    </div>
  );
}