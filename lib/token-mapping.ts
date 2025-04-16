import { useEffect, useState } from "react";
import { Token } from '@lifi/sdk';

const API_BASE = 'https://api.coingecko.com/api/v3';

interface CoinGeckoToken {
  id: string;
  symbol: string;
  platforms: { [key: string]: string };
}

async function fetchTokenMapping(): Promise<Map<string, string>> {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  if (!apiKey) {
    throw new Error("CoinGecko API key is missing");
  }

  const response = await fetch(`${API_BASE}/coins/list?include_platform=true`, {
    headers: {
      "x-cg-api-key": apiKey,
    },
  });
  const tokens: CoinGeckoToken[] = await response.json();
  const mapping = new Map<string, string>();

  tokens.forEach((token) => {
    Object.entries(token.platforms).forEach(([platform, address]) => {
      const chainId = getChainIdFromPlatform(platform);
      if (chainId) {
        const key = `${chainId}-${address.toLowerCase()}`;
        mapping.set(key, token.id);
      }
    });
  });
  return mapping;
}

function getChainIdFromPlatform(platform: string): number | undefined {
  const platformToChainId: { [key: string]: number } = {
    ethereum: 1,
    "binance-smart-chain": 56,
    "polygon-pos": 137,
    // Add more mappings as needed
  };
  return platformToChainId[platform];
}

export async function fetchCoinHistory(coinId: string, days = 7) {
  if (!process.env.NEXT_PUBLIC_COINGECKO_API_KEY) {
    console.error('CoinGecko API key is missing');
    throw new Error('API key not configured');
  }

  const url = `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url, {
    headers: {
      'x-cg-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
    },
  });
  return res.json();
}

export function useTokenId(token: Token | null): string | undefined {
  const [mapping, setMapping] = useState<Map<string, string> | null>(null);

  useEffect(() => {
    fetchTokenMapping().then(setMapping).catch(console.error);
  }, []);

  if (!mapping || !token) return undefined;

  const key = `${token.chainId}-${token.address.toLowerCase()}`;
  return mapping.get(key);
}