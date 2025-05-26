"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import PriceView from "@/components/Swap/price";
import QuoteView from "@/components/Swap/quote";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";

import type { PriceResponse } from "@/src/utils/types";

interface SwapProps {
  price: any;
  setPrice: (price: any) => void;
  setFinalize: (finalize: boolean) => void;
  chainId: number;
  fromToken: string;
  setFromToken: (token: string) => void;
  toToken: string;
  setToToken: (token: string) => void;
  setCurrentChartToken: (token: string) => void;
   cacheKey: string; // Add this line
}

export default function Swap({
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  setCurrentChartToken,
}: SwapProps) {
  const { address } = useAccount();

  const chainId = useChainId() || 1;
  console.log("chainId: ", chainId);

  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState<PriceResponse | undefined>();
  const [quote, setQuote] = useState();

  return (
    <div
      className={`flex min-h-full flex-col w-full items-center justify-between bg-transparent`}
    >
      {finalize && price ? (
        <QuoteView
          taker={address}
          price={price}
          quote={quote}
          setQuote={setQuote}
          chainId={chainId}
        />
      ) : (
        <PriceView
            taker={address}
            price={price}
            setPrice={setPrice}
            setFinalize={setFinalize}
            chainId={chainId}
            fromToken={fromToken}
            setFromToken={setFromToken}
            toToken={toToken}
            setToToken={setToToken}
            setCurrentChartToken={setCurrentChartToken} value={undefined}        />
      )}
    </div>
  );
}



