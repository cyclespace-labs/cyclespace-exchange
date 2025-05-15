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
    
    <Badge className="justify-end w-full items-end h-fit border-none flex flex-col bg-transparent gap-4">
      <div className="h-[1px] w-full bg-slate-300 dark:bg-zinc-700 rounded-xl" />
      <div className=" bg-zinc-800 dark:bg-zinc-800 p-2 px-4 rounded-3xl mb-3 flex w-fit">
        <div className="text-slate-500 text-[11px] items-end ">
          {price && price.fees?.integratorFee?.amount
            ? "Swap Fee: " +
              Number(
                formatUnits(
                  BigInt(price.fees.integratorFee.amount),
                  MAINNET_TOKENS_BY_SYMBOL[buyToken].decimals
                )
              ).toFixed(3) + // Changed here
              " " +
              MAINNET_TOKENS_BY_SYMBOL[buyToken].symbol
            : null}
        </div>
      </div>
    </Badge>
  );
}