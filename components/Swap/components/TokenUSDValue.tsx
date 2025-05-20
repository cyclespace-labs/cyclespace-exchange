import { useEffect, useState, useCallback, useRef } from "react";
import { MAINNET_TOKENS_BY_SYMBOL, COINGECKO_IDS } from "@/src/constants";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenUSDValueProps {
  amount: string;
  tokenSymbol: string;
  chainId: number;
}

type PriceCache = Record<string, { price: number; timestamp: number }>;

const priceCache: PriceCache = {};

export const TokenUSDValue = ({ amount, tokenSymbol, chainId }: TokenUSDValueProps) => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const token = MAINNET_TOKENS_BY_SYMBOL[tokenSymbol.toLowerCase()];

  const validateAmount = useCallback(() => {
    const amountNum = parseFloat(amount);
    return !isNaN(amountNum) && amountNum > 0;
  }, [amount]);

  const fetchData = useCallback(async () => {
    if (!token || !validateAmount()) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
      if (!apiKey) throw new Error("CoinGecko API key is missing");

      const coingeckoId = COINGECKO_IDS[token.symbol.toLowerCase()];
      if (!coingeckoId) {
        throw new Error("USD price not available for this token");
      }

      // Cache check with 2-second freshness
      const cached = priceCache[coingeckoId];
      if (cached && Date.now() - cached.timestamp < 2000) {
        setUsdPrice(cached.price);
        setLoading(false);
        return;
      }

      // Setup 2-second timeout
      const timeoutId = setTimeout(() => {
        abortController.abort();
        throw new Error("API request timed out");
      }, 2000);

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
        {
          headers: { "x-cg-demo-api-key": apiKey },
          signal: abortController.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const price = data[coingeckoId]?.usd;
      if (!price) throw new Error("No price data available");

      // Update cache with timestamp
      priceCache[coingeckoId] = { price, timestamp: Date.now() };
      setUsdPrice(price);
    } catch (err) {
      if (!abortController.signal.aborted) {
        const message = err instanceof Error ? err.message : "Failed to fetch price";
        setError(message);
        console.error("Price fetch error:", message);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
      abortControllerRef.current = null;
    }
  }, [token, validateAmount]);

  // Debounce input with 500ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      if (validateAmount()) {
        fetchData();
      }
    }, 500);

    return () => {
      clearTimeout(handler);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [amount, fetchData, validateAmount]);

  if (!validateAmount()) return null;

  return (
    <div className="text-sm text-muted-foreground mt-1 flex min-h-[20px]">
      {loading ? (
        <Skeleton className="h-4 w-[200px]">
          <span className="text-xs">Calculating USD value...</span>
        </Skeleton>
      ) : error ? (
        <button
          className="text-xs text-destructive cursor-pointer hover:underline transition-opacity"
          onClick={fetchData}
          aria-label="Retry price fetch"
        >
          Error: {error}. Click to reload
        </button>
      ) : usdPrice ? (
        `$${(parseFloat(amount) * usdPrice).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`
      ) : null}
    </div>
  );
};