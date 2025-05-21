// components/DataTable.tsx
"use client";
import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MAINNET_TOKENS } from "@/src/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Loader } from "lucide-react";

interface TokenListProps {
  onSelect: (tokenSymbol: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface TokenMarketData {
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
}

export function DataTable({ onSelect, isOpen, onClose }: TokenListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [marketData, setMarketData] = useState<Record<string, TokenMarketData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real-time market data
  useEffect(() => {
    if (!isOpen) return;

    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/market-data');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Failed to fetch');
        
        // Convert array to object with symbol as key
        const marketDataMap = data.reduce((acc: Record<string, TokenMarketData>, item: TokenMarketData) => {
          acc[item.symbol.toLowerCase()] = item;
          return acc;
        }, {});
        
        setMarketData(marketDataMap);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Merge static token data with real-time market data
  const mergedTokens = MAINNET_TOKENS.map(token => ({
    ...token,
    ...marketData[token.symbol.toLowerCase()]
  }));

  const columns: ColumnDef<(typeof mergedTokens)[0]>[] = [
    {
      accessorKey: "logoURI",
      header: "",
      cell: ({ row }) => (
        <Avatar className="h-7 w-7">
          <AvatarImage src={row.original.logoURI} alt={row.original.name} />
        </Avatar>
      ),
    },
    {
      accessorKey: "symbol",
      header: "Token",
      cell: ({ row }) => (
        <div className="font-semibold">{row.original.symbol.toUpperCase()}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div>
          {row.original.price ? 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(row.original.price) : 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: "priceChange24h",
      header: "24h Change",
      cell: ({ row }) => {
        const change = row.original.priceChange24h;
        if (!change) return 'N/A';
        return (
          <div className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
            {`${change.toFixed(2)}%`}
          </div>
        );
      },
    },
    {
      accessorKey: "volume24h",
      header: "24h Volume",
      cell: ({ row }) => (
        <div>
          {row.original.volume24h ?
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact'
            }).format(row.original.volume24h) : 'N/A'}
        </div>
      ),
    },
  ];

  const filteredTokens = mergedTokens.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const table = useReactTable({
    data: filteredTokens,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center h-full p-4">
        <div className="bg-background rounded-xl w-full max-w-4xl border shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Select Token</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Input
              placeholder="Search by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/50 border-none focus-visible:ring-1"
            />

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Loader className="animate-spin h-8 w-8" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => {
                          onSelect(row.original.symbol);
                          onClose();
                        }}
                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}