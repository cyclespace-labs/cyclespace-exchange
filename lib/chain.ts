// src/config/chains.ts
import { 
    mainnet,
    arbitrum,
    avalanche,
    base,
    bsc,
    linea,
    mantle,
    mode,
    optimism,
    polygon,
    scroll,
  } from "viem/chains";
  
  // Custom chains not available in viem
  const berachain = {
    id: 80094,
    name: "Berachain",
    network: "berachain",
    nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc.berachain.com"] } },
    blockExplorers: {
      default: { name: "BerachainScan", url: "https://scan.berachain.com" },
    },
  } as const;
  
  const blast = {
    id: 81457,
    name: "Blast",
    network: "blast",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc.blast.io"] } },
    blockExplorers: {
      default: { name: "BlastScan", url: "https://scan.blast.io" },
    },
  } as const;
  
  const ink = {
    id: 57073,
    name: "Ink",
    network: "ink",
    nativeCurrency: { name: "INK", symbol: "INK", decimals: 18 },
    rpcUrls: { default: { http: ["https://ink-rpc.com"] } },
  } as const;
  
  const monad = {
    id: 10143,
    name: "Monad",
    network: "monad",
    nativeCurrency: { name: "MONAD", symbol: "MONAD", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc.monad.xyz"] } },
    blockExplorers: {
      default: { name: "MonadScan", url: "https://monadscan.com" },
    },
  } as const;
  
  const unichain = {
    id: 130,
    name: "Unichain",
    network: "unichain",
    nativeCurrency: { name: "UNI", symbol: "UNI", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc.unichain.network"] } },
  } as const;
  
  const worldchain = {
    id: 480,
    name: "World Chain",
    network: "worldchain",
    nativeCurrency: { name: "WORLD", symbol: "WORLD", decimals: 18 },
    rpcUrls: { default: { http: ["https://worldchain-rpc.com"] } },
  } as const;
  
  interface ChainConfig {
    isSupported: boolean;
    hasLiquidity: boolean;
    chain: typeof mainnet;
  }
  
  export const CHAINS: ChainConfig[] = [
    {
      chain: mainnet,        // Ethereum
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: arbitrum,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: avalanche,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: base,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: berachain,
      isSupported: true,
      hasLiquidity: false,
    },
    {
      chain: blast,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: bsc,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: ink,
      isSupported: true,
      hasLiquidity: false,
    },
    {
      chain: linea,
      isSupported: true,
      hasLiquidity: false,
    },
    {
      chain: mantle,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: mode,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: monad,
      isSupported: true,
      hasLiquidity: false,
    },
    {
      chain: optimism,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: polygon,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: scroll,
      isSupported: true,
      hasLiquidity: true,
    },
    {
      chain: unichain,
      isSupported: true,
      hasLiquidity: false,
    },
    {
      chain: worldchain,
      isSupported: true,
      hasLiquidity: false,
    },
  ];
  
  // Utility exports
  export const CHAINS_BY_ID = Object.fromEntries(
    CHAINS.map((config) => [config.chain.id, config])
  );
  
  export const CHAINS_BY_NAME = Object.fromEntries(
    CHAINS.map((config) => [config.chain.network.toLowerCase(), config])
  );
  
  // Type exports
  export type ChainName = keyof typeof CHAINS_BY_NAME;
  export type ChainId = keyof typeof CHAINS_BY_ID;