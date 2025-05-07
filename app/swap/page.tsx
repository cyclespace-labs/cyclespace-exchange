"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import PriceView from "@/components/Swap/price";
import QuoteView from "@/components/Swap/quote";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";

import type { PriceResponse } from "@/utils/types";

function Swap() {
  const { address } = useAccount();

  const chainId = useChainId() || 1;
  console.log("chainId: ", chainId);

  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState<PriceResponse | undefined>();
  const [quote, setQuote] = useState();

  return (
    <div
      className={`flex min-h-fit flex-col items-center justify-between p-0 bg-transparent`}
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
        />
      )}
    </div>
  );
}

export default Swap;
