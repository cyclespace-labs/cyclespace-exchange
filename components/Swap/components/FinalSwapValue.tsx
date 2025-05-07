import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { MAINNET_TOKENS_BY_SYMBOL, AFFILIATE_FEE } from "@/lib/constants";

interface FinalSwapValueProps {
  buyAmount: string;
  buyTokenSymbol: string;
  chainId: number;
  feeAmount: string;
}

export const FinalSwapValue = ({
  buyAmount,
  buyTokenSymbol,
  chainId,
  feeAmount
}: FinalSwapValueProps) => {
  const [formattedNetAmount, setFormattedNetAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formatAmount = () => {
      try {
        setLoading(true);
        setError(null);

        const token = MAINNET_TOKENS_BY_SYMBOL[buyTokenSymbol.toLowerCase()];
        if (!token) {
          setError("Invalid token");
          return;
        }

        // The buyAmount is already net of fees, just format it
        const formatted = Number(buyAmount).toFixed(4);
        setFormattedNetAmount(formatted);
        
      } catch (err) {
        console.error("Failed to format amount:", err);
        setError("Error formatting amount");
      } finally {
        setLoading(false);
      }
    };

    formatAmount();
  }, [buyAmount, buyTokenSymbol, chainId]);

  if (!buyAmount || parseFloat(buyAmount) <= 0) return null;

  return (
    <div className="">
      <div className="text-sm text-gray-400 mt-1 font-normal flex">
      {loading ? (
        <span className="text-xs">Calculating final amount...</span>
      ) : error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : formattedNetAmount ? (
        `(incl. ${AFFILIATE_FEE/100}% fee) ${formattedNetAmount} ${buyTokenSymbol.toUpperCase()}`
      ) : null}
      </div>
    </div>
  );
};