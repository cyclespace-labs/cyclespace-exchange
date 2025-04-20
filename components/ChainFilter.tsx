"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenChart } from '@/components/TokenChart';
import { green } from '@mui/material/colors';


interface Chain {
  name: string
  assetPlatformId: string
  nativeTokenId: string
  iconUrl: string
}

interface Token {
  id: string
  name: string
  iconUrl: string
}

interface AssetPlatform {
  id: string
  chain_identifier: number
  name: string
  shortname: string
  native_coin_id: string
}

interface ChainFilterProps {
  days?: number
  currency?: string
  chartColor?: string
  delay?: number
}

export function ChainFilter({
  days = 1,
  currency = "usd",
  chartColor = "green",
  delay = 0,
}: ChainFilterProps) {
  const [chains, setChains] = useState<Chain[]>([])
  const [selectedChainId, setSelectedChainId] = useState<string | undefined>(undefined)
  const [tokens, setTokens] = useState<Token[]>([])
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>(undefined)
  const [isLoadingChains, setIsLoadingChains] = useState(true)
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedChain = chains.find(chain => chain.assetPlatformId === selectedChainId)

  useEffect(() => {
    const fetchChains = async () => {
      try {
        setIsLoadingChains(true)
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        if (!apiKey) throw new Error("CoinGecko API key is missing")

        // Fetch asset platforms
        const platformsResponse = await fetch(
          "https://api.coingecko.com/api/v3/asset_platforms",
          { headers: { "x-cg-demo-api-key": apiKey } }
        )
        if (!platformsResponse.ok) throw new Error("Failed to fetch asset platforms")
        const platformsData: AssetPlatform[] = await platformsResponse.json()

        // Fetch native token images
        const nativeTokenIds = platformsData
          .map(p => p.native_coin_id)
          .filter((id): id is string => !!id)
        const marketResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nativeTokenIds.join(',')}&per_page=250`,
          { headers: { "x-cg-demo-api-key": apiKey } }
        )
        if (!marketResponse.ok) throw new Error("Failed to fetch native tokens")
        const marketData: any[] = await marketResponse.json()
        const tokenImageMap = new Map(marketData.map(token => [token.id, token.image]))

        // Create chain list with icons
        const chainList = platformsData
          .filter(p => p.native_coin_id && p.id)
          .map(p => ({
            name: p.name,
            assetPlatformId: p.id,
            nativeTokenId: p.native_coin_id,
            iconUrl: tokenImageMap.get(p.native_coin_id) || '/chain-fallback.svg'
          }))

        setChains(chainList)
        if (chainList.length > 0) setSelectedChainId(chainList[0].assetPlatformId)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoadingChains(false)
      }
    }

    fetchChains()
  }, [])

  useEffect(() => {
    const loadTokens = async () => {
      if (!selectedChainId || !selectedChain) return

      setIsLoadingTokens(true)
      try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        if (!apiKey) throw new Error("CoinGecko API key is missing")

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&asset_platform_id=${selectedChainId}&per_page=100&page=1`,
          { headers: { "x-cg-demo-api-key": apiKey } }
        )
        if (!response.ok) throw new Error("Failed to fetch tokens")
        
        const data = await response.json()
        const tokenList = data.map((token: any) => ({
          id: token.id,
          name: token.name,
          iconUrl: token.image
        }))

        setTokens(tokenList)
        setSelectedTokenId(selectedChain.nativeTokenId)
      } catch (err) {
        console.error(err)
        setTokens([])
      } finally {
        setIsLoadingTokens(false)
      }
    }

    loadTokens()
  }, [selectedChainId, chains, currency, selectedChain])

  if (isLoadingChains) return <div>Loading chains...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3">
        {/* Chain Selection */}
        <Select value={selectedChainId} onValueChange={setSelectedChainId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a chain">
              {selectedChain && (
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedChain.iconUrl} 
                    alt={""}
                    className="w-4 h-4 rounded-full"
                  />
                  {selectedChain.name}
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {chains.map(chain => (
              <SelectItem key={chain.assetPlatformId} value={chain.assetPlatformId}>
                <div className="flex items-center gap-2">
                  <img
                    src={chain.iconUrl}
                    alt={""}
                    className="w-4 h-4 rounded-full"
                  />
                  {chain.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Token Selection */}
        {selectedChainId && (
          <>
            {isLoadingTokens ? (
              <div>Loading tokens...</div>
            ) : (
              <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a token">
                        {selectedTokenId && (
                            <div className="flex items-center gap-2">
                            <div className="relative">
                                <img
                                src={tokens.find(t => t.id === selectedTokenId)?.iconUrl}
                                alt=""
                                className="w-6 h-6 rounded-full"
                                />
                                <img
                                src={selectedChain?.iconUrl}
                                alt=""
                                className="w-3 h-3 rounded-full border border-gray-600 absolute -bottom-0.5 -right-0.5 bg-white"
                                />
                            </div>
                                {selectedTokenId}
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {tokens.map(token => (
                    <SelectItem key={token.id} value={token.id}>
                        <div className="flex items-center gap-2 ">
                            <div className="relative ">
                            <img
                                src={token.iconUrl}
                                alt={""}
                                className="w-6 h-6 rounded-full"
                            />
                            <img
                                src={selectedChain?.iconUrl}
                                alt=""
                                className="w-3 h-3 rounded-full border  border-gray-600 absolute -bottom-0.5 -right-0.5 bg-white"
                            />
                            </div>
                            <span>{token.name}</span>
                        </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </>
        )}
      </div>

      {/* Token Chart */}
      {selectedTokenId && (
        <TokenChart
            tokenId={selectedTokenId}
            chainIconUrl={selectedChain?.iconUrl}
            tokenIconUrl={tokens.find(t => t.id === selectedTokenId)?.iconUrl}
            days={days}
            currency={currency}
            chartColor={green[500]}
            delay={delay}
        />
        )}
    </div>
  )
}

