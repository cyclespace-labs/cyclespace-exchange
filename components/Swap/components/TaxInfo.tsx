import { MAINNET_TOKENS_BY_SYMBOL } from "@/lib/constants";
import { useState } from "react";

interface TaxInfoProps {
  buyTokenTax: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
  sellTokenTax: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
  buyToken: string;
  sellToken: string;
}

export function TaxInfo({
  buyTokenTax,
  sellTokenTax,
  buyToken,
  sellToken,
}: TaxInfoProps) {
  const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  return (
    <div className="text-slate-400 bg-zinc-800 w-26 h-6 ">
      {buyTokenTax.buyTaxBps !== "0" && (
        <p>
          {MAINNET_TOKENS_BY_SYMBOL[buyToken].symbol +
            ` Buy Tax: ${formatTax(buyTokenTax.buyTaxBps)}%`}
        </p>
      )}
      {sellTokenTax.sellTaxBps !== "0" && (
        <p>
          {MAINNET_TOKENS_BY_SYMBOL[sellToken].symbol +
            ` Sell Tax: ${formatTax(sellTokenTax.sellTaxBps)}%`}
        </p>
      )}
    </div>
  );
}