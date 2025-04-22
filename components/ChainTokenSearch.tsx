"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TokenChart } from "@/components/TokenChart";
import { green } from "@mui/material/colors";
import { Search } from "lucide-react";

interface Chain {
  name: string;
  assetPlatformId: string;
  nativeTokenId: string;
  iconUrl: string;
}

interface Token {
  id: string;
  name: string;
  iconUrl: string;
  address?: string;
}

interface AssetPlatform {
  id: string;
  chain_identifier: number;
  name: string;
  shortname: string;
  native_coin_id: string;
}

interface ChainTokenSearchProps {
  days?: number;
  currency?: string;
  chartColor?: string;
  delay?: number;
  showChart?: boolean;
  placeholder?: string;
}

export function ChainTokenSearch({
  days = 1,
  currency = "usd",
  chartColor = "green",
  delay = 0,
  showChart = true,
  placeholder = "Select Chain",
}: ChainTokenSearchProps) {
  const [chains, setChains] = useState<Chain[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isLoadingChains, setIsLoadingChains] = useState(true);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [searchToken, setSearchToken] = useState("");
  const [showAllChains, setShowAllChains] = useState(false);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        setIsLoadingChains(true);
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        if (!apiKey) throw new Error("CoinGecko API key is missing");

        const platformsResponse = await fetch(
          "https://api.coingecko.com/api/v3/asset_platforms",
          { headers: { "x-cg-demo-api-key": apiKey } }
        );
        if (!platformsResponse.ok) throw new Error("Failed to fetch asset platforms");
        const platformsData: AssetPlatform[] = await platformsResponse.json();

        const nativeTokenIds = platformsData
          .map(p => p.native_coin_id)
          .filter((id): id is string => !!id);
        const marketResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nativeTokenIds.join(',')}&per_page=250`,
          { headers: { "x-cg-demo-api-key": apiKey } }
        );
        if (!marketResponse.ok) throw new Error("Failed to fetch native tokens");
        const marketData: any[] = await marketResponse.json();
        const tokenImageMap = new Map(marketData.map(token => [token.id, token.image]));

        const chainList = platformsData
          .filter(p => p.native_coin_id && p.id)
          .map(p => ({
            name: p.name,
            assetPlatformId: p.id,
            nativeTokenId: p.native_coin_id,
            iconUrl: tokenImageMap.get(p.native_coin_id) || `https://coinicons-api.vercel.app/api/icon/${p.native_coin_id}`
          }));

        setChains(chainList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingChains(false);
      }
    };

    fetchChains();
  }, []);

  useEffect(() => {
    if (chains.length === 0) return;
    const solanaChain = chains.find(chain => chain.assetPlatformId === "solana");
    if (solanaChain) {
      setSelectedChain(solanaChain);
    } else {
      setSelectedChain(chains[0]);
    }
  }, [chains]);

  useEffect(() => {
    if (!selectedChain) return;
    setIsLoadingTokens(true);
    
    const loadTokens = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        if (!apiKey) throw new Error("CoinGecko API key is missing");

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&asset_platform_id=${selectedChain.assetPlatformId}&per_page=100&page=1`,
          { headers: { "x-cg-demo-api-key": apiKey } }
        );
        if (!response.ok) throw new Error("Failed to fetch tokens");

        const data = await response.json();
        const tokenList = data.map((token: any) => ({
          id: token.id,
          name: token.name,
          iconUrl: token.image,
          address: token.contract_address || undefined
        }));

        setTokens(tokenList);
        
        const bitcoinToken = tokenList.find(token => token.id === "bitcoin");
        setSelectedToken(bitcoinToken || tokenList[0]);
      } catch (err) {
        setTokens([]);
        setError("Failed to load tokens");
      } finally {
        setIsLoadingTokens(false);
      }
    };
    loadTokens();
  }, [selectedChain, currency]);

  useEffect(() => {
    if (selectedChain && selectedChain.assetPlatformId !== "solana") {
      setSelectedToken(null);
      setSearchToken("");
    }
  }, [selectedChain]);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full justify-between items-center rounded-full bg-white">
            <span className="text-gray-500">Search for tokens and chains</span>
            <div className="flex items-center gap-2">
              {selectedChain && (
                <>
                  <img 
                    src={selectedChain.iconUrl} 
                    alt={selectedChain.name} 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/chain-fallback.svg";
                    }}
                  />
                  <span>{selectedChain.name}</span>
                </>
              )}
              {selectedToken && (
                <>
                  <span>/</span>
                  <img 
                    src={selectedToken.iconUrl} 
                    alt={selectedToken.name} 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/token-fallback.svg";
                    }}
                  />
                  <span>{selectedToken.name}</span>
                </>
              )}
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl h-fit bg-white p-0 gap-5">
          <DialogHeader className="px-6 pt-6 pb-0">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search name or paste address"
                className="pl-10 h-12 rounded-full w-[550px] border-none focus-visible:ring-gray-200 focus-visible:ring-1"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
              />
            </div>
          </DialogHeader>

          <div className="px-6 space-y-6 pb-6">
            <div className="flex gap-2 items-center justify-between overflow-x-auto pb-2">
              <Button
                variant={!selectedChain ? "default" : "outline"}
                className="shrink-0 h-12 w-12 rounded-2xl p-0 border-none bg-gray-200"
                onClick={() => setSelectedChain(null)}
              >
                All
              </Button>
              
              {chains.slice(0, showAllChains ? chains.length : 8).map(chain => (
                <Button
                  key={chain.assetPlatformId}
                  variant={selectedChain?.assetPlatformId === chain.assetPlatformId ? "default" : "outline"}
                  className="shrink-0 h-12 w-12 rounded-2xl border-0 bg-gray-200 p-0 hover:bg-gray-100"
                  onClick={() => setSelectedChain(chain)}
                >
                  <img 
                    src={chain.iconUrl} 
                    alt={chain.name} 
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/chain-fallback.svg";
                    }}
                  />
                </Button>
              ))}

              {!showAllChains && chains.length > 8 && (
                <Button
                  variant="outline"
                  className="shrink-0 h-12 w-12 rounded-2xl border-none bg-gray-200 p-0"
                  onClick={() => setShowAllChains(true)}
                >
                  +{chains.length - 8}
                </Button>
              )}
            </div>

            {selectedChain && !isLoadingTokens && tokens.length > 0 && (
              <div className="space-y-5">
                <h3 className="text-sm font-semibold">
                  Most popular on {selectedChain.name}
                </h3>
                <div className="flex flex-row gap-1 justify-between items-center">
                  {tokens.slice(0, 6).map(token => (
                    <Card
                      key={token.id}
                      className="pr-4 pl-2 py-1 cursor-pointer border-none bg-gray-200 hover:bg-gray-100 flex flex-row items-center gap-1 w-fit rounded-full"
                      onClick={() => {
                        setSelectedToken(token);
                        setOpen(false);
                      }}
                    >
                      <img 
                        src={token.iconUrl} 
                        alt={token.name} 
                        className="w-7 h-7 rounded-full" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/token-fallback.svg";
                        }}
                      />
                      <span className="text-[13px] text-center w-fit justify-start">{token.name}</span>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-5">
              <h3 className="text-sm font-semibold">All Tokens</h3>
              <div className="space-y-2 overflow-auto max-h-80">
                {isLoadingTokens ? (
                  <div className="text-center py-2 h-[600px]">Loading tokens...</div>
                ) : tokens
                  .filter(token => 
                    token.name.toLowerCase().includes(searchToken.toLowerCase()) ||
                    token.address?.toLowerCase().includes(searchToken.toLowerCase())
                  )
                  .map(token => (
                    <Card
                      key={token.id}
                      className="flex flex-row px-2 py-2 border-none hover:bg-gray-100 justify-start items-center gap-2 cursor-pointer"
                      onClick={() => {
                        setSelectedToken(token);
                        setOpen(false);
                      }}
                    >
                      <div className="relative">
                        <img 
                          src={token.iconUrl} 
                          alt={token.name} 
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/token-fallback.svg";
                          }}
                        />
                        {selectedChain?.iconUrl && (
                          <img
                            src={selectedChain.iconUrl}
                            alt="Chain"
                            className="w-4 h-4 rounded-full border border-gray-600 absolute -bottom-1 -right-1 bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/chain-fallback.svg";
                            }}
                          />
                        )}
                      </div>

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="font-medium text-[14px]">{token.name}</div>
                        {token.address ? (
                          <div className="text-[12px] text-muted-foreground">
                            {token.address.slice(0, 6)}...{token.address.slice(-4)}
                          </div>
                        ) : (
                          <div className="text-[12px] text-muted-foreground">
                            Native token
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showChart && selectedChain && selectedToken && (
        <TokenChart
          tokenId={selectedToken.id}
          tokenIconUrl={selectedToken.iconUrl}
          chainIconUrl={selectedChain.iconUrl}
          days={days}
          currency={currency}
          chartColor={green[500]}
          delay={delay}
        />
      )}
      
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}