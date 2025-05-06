import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState, ChangeEvent } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
  useReadContract,
  useBalance,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import {
  MAINNET_TOKENS,
  MAINNET_TOKENS_BY_SYMBOL,
  MAX_ALLOWANCE,
  AFFILIATE_FEE,
  FEE_RECIPIENT,
} from "@/lib/constants";
import { permit2Abi } from "@/utils/permit2Abi";
import Image from "next/image";
import qs from "qs";
import { TokenInputSection } from "./components/TokenInputSection";
import { Button } from "@/components/ui/button";
import { TokenEquivalentValue } from "./components/TokenEquivalentValue";
import { FinalSwapValue } from "./components/FinalSwapValue";
import { AffiliateFeeBadge } from "./components/SwapFee";
import { TaxInfo } from "./components/TaxInfo";
import { SwapButton } from "./components/SwapButton";
 


export const DEFAULT_BUY_TOKEN = (chainId: number) => {
  if (chainId === 1) {
    return "weth";
  }
};

export default function PriceView({
  price,
  taker,
  setPrice,
  setFinalize,
  chainId,
}: {
  price: any;
  taker: Address | undefined;
  setPrice: (price: any) => void;
  setFinalize: (finalize: boolean) => void;
  chainId: number;
}) {
  const [sellToken, setSellToken] = useState("weth");
  const [buyToken, setBuyToken] = useState("usdc");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [error, setError] = useState([]);
  const [buyTokenTax, setBuyTokenTax] = useState({
    buyTaxBps: "0",
    sellTaxBps: "0",
  });
  const [sellTokenTax, setSellTokenTax] = useState({
    buyTaxBps: "0",
    sellTaxBps: "0",
  });

  const sanitizeDecimalPlaces = (value: string, decimals: number): string => {
    const [integerPart, decimalPart] = value.split('.');
    if (!decimalPart) return value;
    return `${integerPart}.${decimalPart.slice(0, decimals)}`;
  }

  const tokensByChain = (chainId: number) => {
    if (chainId === 1) {
      return MAINNET_TOKENS_BY_SYMBOL;
    }
    return MAINNET_TOKENS_BY_SYMBOL;
  };

  const sellTokenObject = tokensByChain(chainId)[sellToken];
  const buyTokenObject = tokensByChain(chainId)[buyToken];

  const sellTokenDecimals = sellTokenObject.decimals;
  const buyTokenDecimals = buyTokenObject.decimals;
  const sellTokenAddress = sellTokenObject.address;

  const parsedSellAmount =
    sellAmount && tradeDirection === "sell"
    ? (() => {
      try {
        return parseUnits(sellAmount, sellTokenDecimals).toString();
      } catch (e) {
        console.error("Invalid sell amount:", e);
        return undefined;
      }
    })()
      : undefined;

  const parsedBuyAmount =
    buyAmount && tradeDirection === "buy"
      ? parseUnits(buyAmount, buyTokenDecimals).toString()
      : undefined;

  // Fetch price data and set the buyAmount whenever the sellAmount changes
  useEffect(() => {
    const params = {
      chainId: chainId,
      sellToken: sellTokenObject.address,
      buyToken: buyTokenObject.address,
      sellAmount: parsedSellAmount,
      buyAmount: parsedBuyAmount,
      taker,
      swapFeeRecipient: FEE_RECIPIENT,
      swapFeeBps: AFFILIATE_FEE,
      swapFeeToken: buyTokenObject.address,
      tradeSurplusRecipient: FEE_RECIPIENT,
    };

    async function main() {
      
    // Clear buy amount if sell amount is empty
    if (sellAmount === "") {
      setBuyAmount("");
      setPrice(null);
      return;
    }

    const response = await fetch(`/api/price?${qs.stringify(params)}`);
    const data = await response.json();

    if (data?.validationErrors?.length > 0) {
      setError(data.validationErrors);
    } else {
      setError([]);
    }
    
    if (data.buyAmount) {
      setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
      setPrice(data);
    }
    
    if (data?.tokenMetadata) {
      setBuyTokenTax(data.tokenMetadata.buyToken);
      setSellTokenTax(data.tokenMetadata.sellToken);
    }
  }

 
      main();
    
  }, [
    sellTokenObject.address,
    buyTokenObject.address,
    parsedSellAmount,
    parsedBuyAmount,
    chainId,
    sellAmount,  // Keep this in dependencies
    setPrice,
    FEE_RECIPIENT,
    AFFILIATE_FEE,,
  ]);

  // Hook for fetching balance information for specified token for a specific taker address
  const { data, isError, isLoading } = useBalance({
    address: taker,
    token: sellTokenObject.address,
  });

  console.log("taker sellToken balance: ", data);

  const inSufficientBalance =
    data && sellAmount
      ? parseUnits(sellAmount, sellTokenDecimals) > data.value
      : true;

  // Helper function to format tax basis points to percentage
  const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);

  return (
    
    <div className="flex flex-row justify-between gap-2 h-fit w-[500px] ">
      <div className="container mx-auto p-5 bg-white mt-10 rounded-3xl my-6">
        <div className="bg-transparent dark:bg-slate-800 p-4 rounded-md mb-0">
          <div className="justify-between w-full gap-20 items-center h-fit mx-auto flex flex-row">
            <label htmlFor="sell" className="text-black mb-2 mr-2 font-semibold items-start">
              Sell
            </label>
          </div>

          <section className="">
            <label htmlFor="sell-amount" className="sr-only"></label>
            <TokenInputSection
              label="sell"
              token={sellToken}
              amount={sellAmount}
              chainId={chainId}
              onTokenChange={setSellToken}
              onAmountChange={(value) => {
                const sanitizedValue = sanitizeDecimalPlaces(value, sellTokenDecimals);
                setTradeDirection("sell");
                setSellAmount(sanitizedValue)
              }}
            />
          </section>

        <div>
          {/* Swap Button Container */}
            <div className="relative my-8">
              <SwapButton
                sellToken={sellToken}
                buyToken={buyToken}
                sellAmount={sellAmount}
                buyAmount={buyAmount}
                chainId={chainId}
                setSellToken={setSellToken}
                setBuyToken={setBuyToken}
                setSellAmount={setSellAmount}
                setBuyAmount={setBuyAmount}
                tokensByChain={tokensByChain}
              />
            </div>
        </div>

      <div>

        <div className="w-full items-end justify-end h-fit flex flex-row">
          
            <TokenEquivalentValue 
              sellToken={sellToken}
              buyToken={buyToken}
              chainId={chainId}
            />
          
        </div>

          <label htmlFor="buy" className="text-black mb-4 mr-2 font-semibold">
            Buy
          </label>

          <section className="mt-4 items-start justify-center flex-row">

            

            <label htmlFor="buy-amount" className="sr-only"></label>

            <TokenInputSection
              label="buy"
              token={buyToken}
              amount={buyAmount}
              chainId={chainId}
              onTokenChange={setBuyToken}
              onAmountChange={(value) => {
                // Changed from sellTokenDecimals to buyTokenDecimals
                const sanitizedValue = sanitizeDecimalPlaces(value, buyTokenDecimals);
                setTradeDirection("buy");
                setBuyAmount(sanitizedValue);
              }}
              disabled
            />

              {/* Add FinalSwapValue here */}
              {price && (
                <FinalSwapValue 
                  buyAmount={buyAmount}
                  buyTokenSymbol={buyToken}
                  chainId={chainId}
                  feeAmount={price?.fees?.integratorFee?.amount || "0"}
                />
              )}

          </section>

        </div>

          {/* Affiliate Fee Display */}
          <AffiliateFeeBadge price={price} buyToken={buyToken} />

          {/* Tax Information Display */}
          <TaxInfo
            buyTokenTax={buyTokenTax}
            sellTokenTax={sellTokenTax}
            buyToken={buyToken}
            sellToken={sellToken}
          />
 
        </div>

        {taker ? (
          <ApproveOrReviewButton
            sellTokenAddress={MAINNET_TOKENS_BY_SYMBOL[sellToken].address}
            taker={taker}
            onClick={() => {
              setFinalize(true);
            }}
            disabled={inSufficientBalance}
            price={price}
          />
        ) : (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-full hover:bg-blue-700"
                          onClick={openConnectModal}
                          type="button"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  src={chain.iconUrl}
                                  alt={chain.name ?? "Chain icon"}
                                  width={12}
                                  height={12}
                                  layout="fixed"
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
    </div>
  );

  function ApproveOrReviewButton({
    taker,
    onClick,
    sellTokenAddress,
    disabled,
    price,
  }: {
    taker: Address;
    onClick: () => void;
    sellTokenAddress: Address;
    disabled?: boolean;
    price: any;
  }) {
    // If price.issues.allowance is null, show the Review Trade button
    if (price?.issues.allowance === null) {
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            // fetch data, when finished, show quote view
            onClick();
          }}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-25"
        >
          {disabled ? "Insufficient Balance" : "Review Trade"}
        </button>
      );
    }

    // Determine the spender from price.issues.allowance
    const spender = price?.issues.allowance.spender;

    // 1. Read from erc20, check approval for the determined spender to spend sellToken
    const { data: allowance, refetch } = useReadContract({
      address: sellTokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [taker, spender],
    });
    console.log("checked spender approval");

    // 2. (only if no allowance): write to erc20, approve token allowance for the determined spender
    const { data } = useSimulateContract({
      address: sellTokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, MAX_ALLOWANCE],
    });

    // Define useWriteContract for the 'approve' operation
    const {
      data: writeContractResult,
      writeContractAsync: writeContract,
      error,
    } = useWriteContract();

    // useWaitForTransactionReceipt to wait for the approval transaction to complete
    const { data: approvalReceiptData, isLoading: isApproving } =
      useWaitForTransactionReceipt({
        hash: writeContractResult,
      });

    // Call `refetch` when the transaction succeeds
    useEffect(() => {
      if (data) {
        refetch();
      }
    }, [data, refetch]);

    if (error) {
      return <div>Something went wrong: {error.message}</div>;
    }

    if (allowance === 0n) {
      return (
        <>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={async () => {
              await writeContract({
                abi: erc20Abi,
                address: sellTokenAddress,
                functionName: "approve",
                args: [spender, MAX_ALLOWANCE],
              });
              console.log("approving spender to spend sell token");

              refetch();
            }}
          >
            {isApproving ? "Approving…" : "Approve"}
          </button>
        </>
      );
    }

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          // fetch data, when finished, show quote view
          onClick();
        }}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-25"
      >
        {disabled ? "Insufficient Balance" : "Review Trade"}
      </button>
    );
  }
}
