import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { MAINNET_TOKENS_BY_SYMBOL, AFFILIATE_FEE } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-400 mt-1 font-normal flex">
      {loading ? (
        <span className="text-xs">
          <div className="w-full h-full gap-3 p-3 flex flex-col ">
            <Skeleton className="h-full w-1/2 bg-zinc-800" />
          </div>
      </span>
      ) : error ? (
      <span className="text-xs">
        <div className="w-full h-full gap-3 p-3 flex flex-col ">
          <Skeleton className="h-full w-1/2 bg-zinc-800" />
        </div>
      </span>
      ) : formattedNetAmount ? (
        `(incl. ${AFFILIATE_FEE/100}% fee) ${formattedNetAmount} ${buyTokenSymbol.toUpperCase()}`
      ) : null}
      </div>
    </div>
  );
};