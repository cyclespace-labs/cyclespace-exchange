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
import { Settings } from "lucide-react";
import { color } from "motion/react";
import { TradingChart } from '@/components/dashboard/ui/trading-chart';
import { TokenChart } from "../TokenChart";
import { TokenPicker } from "./components/tokenPicker";
 


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
  const [sellToken, setSellToken] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [fromToken, setFromToken] = useState("link")
  const [toToken, setToToken] = useState("busd")
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

  const sellTokenObject = tokensByChain(chainId)[fromToken];
  const buyTokenObject = tokensByChain(chainId)[toToken];

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
      const formattedValue = formatUnits(data.buyAmount, buyTokenDecimals);
      // Round to 6 decimal places
      const roundedValue = parseFloat(formattedValue).toFixed(3);
      setBuyAmount(roundedValue);
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

  const MAX_ALLOWANCE = BigInt(2 ** 256 - 1);

  return (
    
    <div className="flex flex-row justify-between gap-2 h-full w-full ">

      {/* chart */}
      <div className="w-full h-full flex">
        <TradingChart
          buyTokenSymbol={toToken}
          sellTokenSymbol={fromToken} price={0}          
        />
      </div>

      {/* swap */}
      <div className=" w-[550px] h-full flex flex-col p-5  mt-0 bg-zinc-200 dark:bg-zinc-900 rounded-2xl my-6 shadow justify-center">
        <div className="p-3 gap-3 flex flex-col">
          <div className="justify-between flex flex-row">
            <h1 className="text-[18px] font-medium">Market</h1>
            <Button variant="default" className=" h-fit w-fit bg-transparent shadow shadow-zinc-950">
              <Settings width={35} height={35} color="white"/>
            </Button>
          </div>

          <div className="w-full bg-zinc-700 h-[1px]"/>
        </div>
        
        <div className=" p-4 rounded-md h-fit mb-0">
          <div className="justify-between w-full gap-10 items-center h-full mx-auto flex flex-row">
            <label htmlFor="sell" className="text-black text-[16px] dark:text-white mb-2 mr-2 font-normal items-start">
              Sell
            </label>
          </div>

          <section className="gap-0">
            <label htmlFor="sell-amount" className="sr-only"></label>
            <TokenPicker 
              value={fromToken}
              onValueChange={setFromToken}
              label="From"
            />
            <TokenInputSection
              label="sell"
              token={fromToken}
              onTokenChange={setFromToken}
              amount={sellAmount}
              chainId={chainId}
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
                sellToken={fromToken}
                buyToken={toToken}
                sellAmount={sellAmount}
                buyAmount={buyAmount}
                chainId={chainId}
                setSellToken={setFromToken}
                setBuyToken={setToToken}
                setSellAmount={setSellAmount}
                setBuyAmount={setBuyAmount}
                tokensByChain={tokensByChain}
              />
            </div>
        </div>

      <div>

        <div className="w-full items-end justify-end h-fit flex flex-row">
          
            <TokenEquivalentValue 
              sellToken={fromToken}
              buyToken={toToken}
              chainId={chainId}
            />
          
        </div>

          <label htmlFor="buy" className="text-black dark:text-white text-[16px] mb-4 mr-2 font-normal">
            Buy
          </label>

          <section className="mt-4 items-start justify-center flex-row">

            

            <label htmlFor="buy-amount" className="sr-only"></label>
              <TokenPicker 
              value={toToken}
              onValueChange={setToToken}
              label="To"
            />
            <TokenInputSection
              label="buy"
              token={toToken}
              onTokenChange={setToToken}
              amount={buyAmount}
              chainId={chainId}
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
                <div className="flex flex-col gap-2 mt-3">
                  <div className="h-[1px] w-full bg-slate-300 dark:bg-zinc-700 rounded-xl" />
                    <div className="flex flex-row justify-between items-center align-middle my-4">
                    <h1 className="text-sm">You receive:</h1>
                    <div className="">
                    <FinalSwapValue 
                      buyAmount={buyAmount}
                      buyTokenSymbol={toToken}
                      chainId={chainId}
                      feeAmount={price?.fees?.integratorFee?.amount || "0"}
                    />
                    </div>
                  </div>
                </div>

              )}

          </section>

        </div>

          {/* Affiliate Fee Display */}
          <AffiliateFeeBadge price={price} buyToken={toToken} />

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

    if (allowance === BigInt(0)) {
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
