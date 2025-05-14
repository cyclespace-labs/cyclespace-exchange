import { useEffect, useState } from "react";
import { MAINNET_TOKENS_BY_SYMBOL, COINGECKO_IDS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenUSDValueProps {
  amount: string;
  tokenSymbol: string;
  chainId: number;
}

export const TokenUSDValue = ({ amount, tokenSymbol, chainId }: TokenUSDValueProps) => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = MAINNET_TOKENS_BY_SYMBOL[tokenSymbol.toLowerCase()];

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchUsdPrice = async () => {
      if (!token || !amount || parseFloat(amount) <= 0) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        if (!apiKey) throw new Error("CoinGecko API key is missing");

        const coingeckoId = COINGECKO_IDS[token.symbol.toLowerCase()];
        if (!coingeckoId) {
          setError("USD price not available for this token");
          return;
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
          {
            headers: { 
              "x-cg-demo-api-key": apiKey 
            },
            signal: abortController.signal
          }
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const price = data[coingeckoId]?.usd;
        
        if (!price) throw new Error("No price data available");
        
        setUsdPrice(price);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error("Failed to fetch USD price:", err);
          setError(err instanceof Error ? err.message : "Failed to fetch price");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUsdPrice();
    return () => abortController.abort();
  }, [token?.symbol, amount, chainId]);

  if (!amount || parseFloat(amount) <= 0) return null;

  return (
    <div className="text-sm text-muted-foreground mt-1 flex">
      {loading ? (
        <Skeleton>
          <span className="text-xs">Loading USD value...</span>
        </Skeleton>
      ) : error ? (
        <Skeleton>
            <span className="text-xs text-destructive w-full">Error Reload</span>
        </Skeleton>
      ) : usdPrice ? (
        `$${(parseFloat(amount) * usdPrice).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}`
      ) : null}
    </div>
  );
};