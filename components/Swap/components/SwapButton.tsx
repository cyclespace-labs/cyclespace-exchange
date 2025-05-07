// components/SwapButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SwapButtonProps = {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  chainId: number;
  setSellToken: Dispatch<SetStateAction<string>>;
  setBuyToken: Dispatch<SetStateAction<string>>;
  setSellAmount: Dispatch<SetStateAction<string>>;
  setBuyAmount: Dispatch<SetStateAction<string>>;
  tokensByChain: (chainId: number) => any;
};

export const SwapButton = ({
  sellToken,
  buyToken,
  sellAmount,
  buyAmount,
  chainId,
  setSellToken,
  setBuyToken,
  setSellAmount,
  setBuyAmount,
  tokensByChain
}: SwapButtonProps) => {
  const sanitizeDecimalPlaces = (value: string, decimals: number): string => {
    const [integerPart, decimalPart] = value.split('.');
    if (!decimalPart) return value;
    return `${integerPart}.${decimalPart.slice(0, decimals)}`;
  };

  const handleSwapTokens = () => {
    const newSellToken = buyToken;
    const newBuyToken = sellToken;
    
    // Get decimals for new token pair
    const newSellDecimals = tokensByChain(chainId)[newSellToken].decimals;
    const newBuyDecimals = tokensByChain(chainId)[newBuyToken].decimals;
    
    // Sanitize amounts with new decimals
    const sanitizedSell = sanitizeDecimalPlaces(buyAmount, newSellDecimals);
    const sanitizedBuy = sanitizeDecimalPlaces(sellAmount, newBuyDecimals);

    // Update state with swapped values
    setSellToken(newSellToken);
    setBuyToken(newBuyToken);
    setSellAmount(sanitizedSell);
    setBuyAmount(sanitizedBuy);
  };

  return (
    <div className="relative my-8">
      <div className="h-1 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
      <Button
        variant="outline"
        size="icon"
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rounded-full w-14 h-14 shadow-lg dark:bg-blue-500 bg-blue-500 hover:bg-slate-100 items-center justify-center flex hover:border-blue-500 hover:shadow-blue-400"
        onClick={handleSwapTokens}
      >
        <ArrowUpDown className="h-8 w-6 text-white font-bold hover:text-blue-500" />
      </Button>
    </div>
  );
};