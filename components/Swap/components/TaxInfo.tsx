import { MAINNET_TOKENS_BY_SYMBOL } from "@/lib/constants";

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

  return (
    <div className="text-slate-400">
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