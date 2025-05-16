// components/TechnicalSpecs.tsx
'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { COINGECKO_IDS } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDownIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface TechnicalSpecsProps {
  tokenSymbol: string;
}

interface TechnicalSpecsData {
  marketCapRank: number;
  hashingAlgorithm: string;
  blockTime: number;
  genesisDate: string;
  tokenAddress: string;
  categories: string[];
  description: string;
}

export default function TechnicalSpecs({ tokenSymbol }: TechnicalSpecsProps) {
  const [specsData, setSpecsData] = useState<TechnicalSpecsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchSpecsData = async () => {
      setIsLoading(true);
      setError(null);

      const coingeckoId = COINGECKO_IDS[tokenSymbol.toLowerCase()];
      if (!coingeckoId) {
        setError('Token not supported');
        setIsLoading(false);
        return;
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        const headers: HeadersInit = {};
        if (apiKey) headers["x-cg-demo-api-key"] = apiKey;

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}`, { headers });
        if (!res.ok) throw new Error('Failed to fetch technical data');

        const data = await res.json();
        
        // Get first available contract address
        const platforms = data.platforms ? Object.entries(data.platforms) : [];
        const foundAddress = platforms.find(([_, addr]) => typeof addr === "string" && addr);
        const tokenAddress = typeof foundAddress?.[1] === "string" ? foundAddress[1] : 'N/A';

        const specsData: TechnicalSpecsData = {
          marketCapRank: data.market_cap_rank,
          hashingAlgorithm: data.hashing_algorithm || 'N/A',
          blockTime: data.block_time_in_minutes,
          genesisDate: new Date(data.genesis_date).toLocaleDateString(),
          tokenAddress,
          categories: data.categories || [],
          description: data.description?.en || 'No description available'
        };

        setSpecsData(specsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load technical specs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecsData();
  }, [tokenSymbol]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Technical Specifications
          <Badge variant="secondary">Rank #{specsData?.marketCapRank}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Contract Address */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Contract Address</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono truncate max-w-[160px]">
              {specsData?.tokenAddress}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(specsData?.tokenAddress || '')}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Categories</span>
          <div className="flex flex-wrap gap-2">
            {specsData?.categories?.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
            {!specsData?.categories?.length && (
              <span className="text-sm text-muted-foreground">Uncategorized</span>
            )}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Algorithm</span>
          <Badge variant="outline">{specsData?.hashingAlgorithm}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Block Time</span>
          <span className="text-sm font-medium">
            {specsData?.blockTime} minutes
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Genesis Date</span>
          <span className="text-sm font-medium">
            {specsData?.genesisDate}
          </span>
        </div>

        {/* Expandable Description */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Description</span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className='w-full'>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
              {specsData?.description}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}