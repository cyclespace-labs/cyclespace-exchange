"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenChart } from "./TokenChart"

// Define the structure for chain options
interface Chain {
  name: string
  assetPlatformId: string
  nativeTokenId: string
}

// Define the structure for token options
interface Token {
  id: string
  name: string
}

// Define the structure for CoinGecko's asset platforms
interface AssetPlatform {
  id: string
  chain_identifier: number
  name: string
  shortname: string
  native_coin_id: string
}

// Props interface to match TokenChart customization options
interface ChainFilterProps {
  days?: number
  currency?: string
  chartColor?: string
  delay?: number
}

export function ChainFilter({
  days = 1,
  currency = "usd",
  chartColor = "#BAFD02",
  delay = 0,
}: ChainFilterProps) {
  const [chains, setChains] = useState<Chain[]>([])
  const [selectedChainId, setSelectedChainId] = useState<string | undefined>(undefined)
  const [tokens, setTokens] = useState<Token[]>([])
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>(undefined)
  const [isLoadingChains, setIsLoadingChains] = useState(true)
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch chains on component mount
  useEffect(() => {
    const fetchChains = async () => {
      try {
        setIsLoadingChains(true)
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        if (!apiKey) {
          throw new Error("CoinGecko API key is missing")
        }
        const response = await fetch(
          "https://api.coingecko.com/api/v3/asset_platforms",
          {
            headers: {
              "x-cg-demo-api-key": apiKey,
            },
          }
        )
        if (!response.ok) {
          throw new Error("Failed to fetch asset platforms")
        }
        const data: AssetPlatform[] = await response.json()
        const chainList: Chain[] = data
          .filter((platform) => platform.native_coin_id && platform.id)
          .map((platform) => ({
            name: platform.name,
            assetPlatformId: platform.id,
            nativeTokenId: platform.native_coin_id,
          }))
        setChains(chainList)
        if (chainList.length > 0) {
          setSelectedChainId(chainList[0].assetPlatformId)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoadingChains(false)
      }
    }

    fetchChains()
  }, [])

  // Fetch tokens when selectedChainId changes
  useEffect(() => {
    const loadTokens = async () => {
      if (selectedChainId) {
        const selectedChain = chains.find(chain => chain.assetPlatformId === selectedChainId)
        if (selectedChain) {
          setSelectedTokenId(selectedChain.nativeTokenId)
          setIsLoadingTokens(true)
          try {
            const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
            if (!apiKey) {
              throw new Error("CoinGecko API key is missing")
            }
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&asset_platform_id=${selectedChainId}&per_page=100&page=1`,
              {
                headers: {
                  "x-cg-demo-api-key": apiKey,
                },
              }
            )
            if (!response.ok) {
              throw new Error("Failed to fetch tokens")
            }
            const data = await response.json()
            const tokenList: Token[] = data.map((token: any) => ({
              id: token.id,
              name: token.name,
            }))
            setTokens(tokenList)
          } catch (err) {
            console.error(err)
            setTokens([])
          } finally {
            setIsLoadingTokens(false)
          }
        }
      } else {
        setTokens([])
        setSelectedTokenId(undefined)
      }
    }
    loadTokens()
  }, [selectedChainId, chains, currency])

  if (isLoadingChains) {
    return <div>Loading chains...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      {/* Chain Selection */}
      <Select value={selectedChainId} onValueChange={setSelectedChainId}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a chain" />
        </SelectTrigger>
        <SelectContent>
          {chains.map((chain) => (
            <SelectItem key={chain.assetPlatformId} value={chain.assetPlatformId}>
              {chain.name}
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
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}

      {/* Token Chart */}
      {selectedTokenId && (
        <TokenChart
          tokenId={selectedTokenId}
          days={days}
          currency={currency}
          chartColor={chartColor}
          delay={delay}
        />
      )}
    </div>
  )
}