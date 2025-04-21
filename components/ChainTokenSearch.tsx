"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TokenChart } from "@/components/TokenChart";
import { green } from "@mui/material/colors";

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

  // Dialog state
  const [open, setOpen] = useState(false);
  const [searchChain, setSearchChain] = useState("");
  const [searchToken, setSearchToken] = useState("");

  // Fetch chains on mount
  useEffect(() => {
    const fetchChains = async () => {
      try {
        setIsLoadingChains(true);
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        if (!apiKey) throw new Error("CoinGecko API key is missing");

        // Fetch asset platforms
        const platformsResponse = await fetch(
          "https://api.coingecko.com/api/v3/asset_platforms",
          { headers: { "x-cg-demo-api-key": apiKey } }
        );
        if (!platformsResponse.ok) throw new Error("Failed to fetch asset platforms");
        const platformsData: AssetPlatform[] = await platformsResponse.json();

        // Fetch native token images
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

        // Create chain list with icons
        const chainList = platformsData
          .filter(p => p.native_coin_id && p.id)
          .map(p => ({
            name: p.name,
            assetPlatformId: p.id,
            nativeTokenId: p.native_coin_id,
            iconUrl: tokenImageMap.get(p.native_coin_id) || "/chain-fallback.svg"
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

  // After chains are loaded, set Solana as default chain and Bitcoin as default token (if available)
  useEffect(() => {
    if (chains.length === 0) return;
    const solanaChain = chains.find(chain => chain.assetPlatformId === "solana");
    if (solanaChain) {
      setSelectedChain(solanaChain);
    }
  }, [chains]);

  // Fetch tokens when chain is selected
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
          iconUrl: token.image
        }));

        setTokens(tokenList);

        // Set Bitcoin as default token if available
        const bitcoinToken = tokenList.find(token => token.id === "bitcoin");
        if (bitcoinToken) {
          setSelectedToken(bitcoinToken);
        } else if (tokenList.length > 0) {
          setSelectedToken(tokenList[0]);
        }
      } catch (err) {
        setTokens([]);
        setError("Failed to load tokens");
      } finally {
        setIsLoadingTokens(false);
      }
    };
    loadTokens();
  }, [selectedChain, currency]);

  // Reset token selection when chain changes (except for initial Solana+Bitcoin)
  useEffect(() => {
    if (selectedChain && selectedChain.assetPlatformId !== "solana") {
      setSelectedToken(null);
      setSearchToken("");
    }
  }, [selectedChain]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedChain ? (
              <span className="flex items-center gap-2">
                <img src={selectedChain.iconUrl} alt={selectedChain.name} className="w-5 h-5 rounded-full" />
                {selectedChain.name}
              </span>
            ) : (
              placeholder
            )}
            {selectedToken && (
              <>
                <span className="mx-2">/</span>
                <span className="flex items-center gap-2">
                  <img src={selectedToken.iconUrl} alt={selectedToken.name} className="w-5 h-5 rounded-full" />
                  {selectedToken.name}
                </span>
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {!selectedChain ? "Select a Chain" : "Select a Token"}
            </DialogTitle>
          </DialogHeader>
          {!selectedChain ? (
            <>
              <Input
                placeholder="Search chain..."
                value={searchChain}
                onChange={e => setSearchChain(e.target.value)}
                className="mb-2"
              />
              <div className="max-h-64 overflow-y-auto space-y-1">
                {isLoadingChains ? (
                  <div>Loading chains...</div>
                ) : (
                  chains
                    .filter(chain =>
                      chain.name.toLowerCase().includes(searchChain.toLowerCase())
                    )
                    .map(chain => (
                      <Card
                        key={chain.assetPlatformId}
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent"
                        onClick={() => {
                          setSelectedChain(chain);
                          setOpen(true);
                        }}
                      >
                        <img src={chain.iconUrl} alt={chain.name} className="w-7 h-7 rounded-full" />
                        <span>{chain.name}</span>
                      </Card>
                    ))
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="mb-2"
                onClick={() => setSelectedChain(null)}
              >
                ← Back to Chains
              </Button>
              <Input
                placeholder="Search token..."
                value={searchToken}
                onChange={e => setSearchToken(e.target.value)}
                className="mb-2"
              />
              <div className="max-h-64 overflow-y-auto space-y-1">
                {isLoadingTokens ? (
                  <div>Loading tokens...</div>
                ) : (
                  tokens
                    .filter(token =>
                      token.name.toLowerCase().includes(searchToken.toLowerCase())
                    )
                    .map(token => (
                      <Card
                        key={token.id}
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent"
                        onClick={() => {
                          setSelectedToken(token);
                          setOpen(false);
                        }}
                      >
                        <img src={token.iconUrl} alt={token.name} className="w-7 h-7 rounded-full" />
                        <span>{token.name}</span>
                      </Card>
                    ))
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {showChart && selectedChain && selectedToken ? (
        <TokenChart
          tokenId={selectedToken.id}
          tokenIconUrl={selectedToken.iconUrl}
          chainIconUrl={selectedChain.iconUrl}
          days={days}
          currency={currency}
          chartColor={green[500]}
          delay={delay}
        />
      ) : null}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}