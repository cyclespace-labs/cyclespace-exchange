import { useEffect, useState } from "react";
import { MAINNET_TOKENS_BY_SYMBOL } from "@/lib/constants";



interface TokenUSDValueProps {
  amount: string;
  tokenSymbol: string;
  chainId: number;
}

const COINGECKO_IDS: { [key: string]: string } = {
  weth: "ethereum",
  usdc: "usd-coin",
  dai: "dai",
  floki: "floki",
};

export const TokenUSDValue = ({ amount, tokenSymbol, chainId }: TokenUSDValueProps) => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = MAINNET_TOKENS_BY_SYMBOL[tokenSymbol.toLowerCase()];

  useEffect(() => {
    const fetchUsdPrice = async () => {
      if (!token || !amount || parseFloat(amount) <= 0) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const coingeckoId = COINGECKO_IDS[token.symbol.toLowerCase()];
        if (!coingeckoId) {
          setError("USD price not available");
          return;
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        );
        
        if (!response.ok) throw new Error("Failed to fetch price");
        
        const data = await response.json();
        setUsdPrice(data[coingeckoId]?.usd);
      } catch (err) {
        console.error("Failed to fetch USD price:", err);
        setError("Error fetching price");
      } finally {
        setLoading(false);
      }
    };

    fetchUsdPrice();
  }, [token?.symbol, amount, chainId]);

  if (!amount || parseFloat(amount) <= 0) return null;

  return (
    <div className="text-sm text-gray-500 mt-1 flex">
      {loading ? (
        <span className="text-xs">Loading USD value...</span>
      ) : error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : usdPrice ? (
        `≈ $${(parseFloat(amount) * usdPrice).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`
      ) : null}
    </div>
  );
};