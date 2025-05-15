// components/SwapButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

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

// Create a motion-wrapped version of the icon
const MotionArrow = motion(ArrowUpDown);

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
  const [isRotated, setIsRotated] = useState(false);

  const sanitizeDecimalPlaces = (value: string, decimals: number): string => {
    const [integerPart, decimalPart] = value.split('.');
    if (!decimalPart) return value;
    return `${integerPart}.${decimalPart.slice(0, decimals)}`;
  };

  const handleSwapTokens = () => {
    const newSellToken = buyToken;
    const newBuyToken = sellToken;
    
    const newSellDecimals = tokensByChain(chainId)[newSellToken]?.decimals || 18;
    const newBuyDecimals = tokensByChain(chainId)[newBuyToken]?.decimals || 18;
    
    const sanitizedSell = sanitizeDecimalPlaces(buyAmount, newSellDecimals);
    const sanitizedBuy = sanitizeDecimalPlaces(sellAmount, newBuyDecimals);

    setSellToken(newSellToken);
    setBuyToken(newBuyToken);
    setSellAmount(sanitizedSell);
    setBuyAmount(sanitizedBuy);
    
    setIsRotated(!isRotated);
  };

  return (
    <div className="relative my-8">
      <div className="h-[1px] bg-slate-300 dark:bg-zinc-700 rounded-xl" />
      <Button
        variant="outline"
        size="icon"
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 rounded-full w-14 h-14 shadow-lg dark:bg-blue-500 bg-blue-500 dark:hover:bg-blue-800 items-center justify-center flex hover:border-blue-500 hover:shadow-blue-400"
        onClick={handleSwapTokens}
      >
        <MotionArrow
          className="h-8 w-6 text-white font-bold hover:text-blue-500"
          animate={{ rotate: isRotated ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </Button>
    </div>
  );
};