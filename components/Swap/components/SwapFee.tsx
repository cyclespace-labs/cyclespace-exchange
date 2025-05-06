import { Badge } from "@/components/ui/badge";
import { formatUnits } from "ethers";
import { MAINNET_TOKENS_BY_SYMBOL } from "@/lib/constants";

export function AffiliateFeeBadge({
  price,
  buyToken,
}: {
  price: any;
  buyToken: string;
}) {
  return (
    <Badge className="justify-end w-full items-center h-fit border-none flex">
      <div className=" bg-slate-200 dark:bg-slate-800 p-2 px-4 rounded-3xl mb-3 flex w-fit">
        <div className="text-slate-400 text-[11px] items-end ">
          {price && price.fees?.integratorFee?.amount
            ? "Affiliate Fee: " +
              Number(
                formatUnits(
                  BigInt(price.fees.integratorFee.amount),
                  MAINNET_TOKENS_BY_SYMBOL[buyToken].decimals
                )
              ) +
              " " +
              MAINNET_TOKENS_BY_SYMBOL[buyToken].symbol
            : null}
        </div>
      </div>
    </Badge>
  );
}