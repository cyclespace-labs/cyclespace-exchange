"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Search, Filter } from 'lucide-react';

// Mock transactions data
const mockTransactions = [
  {
    id: 'tx1',
    type: 'Swap',
    tokenFrom: 'ETH',
    tokenTo: 'BTC',
    amountFrom: 1.5,
    amountTo: 0.078,
    value: 5184.12,
    date: '2025-05-15T14:32:21Z',
    status: 'completed',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    fee: 0.0015,
    feeValue: 5.18,
  },
  {
    id: 'tx2',
    type: 'Swap',
    tokenFrom: 'SOL',
    tokenTo: 'USDC',
    amountFrom: 25,
    amountTo: 2450,
    value: 2450.00,
    date: '2025-05-15T10:21:43Z',
    status: 'completed',
    hash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    fee: 0.025,
    feeValue: 3.08,
  },
  {
    id: 'tx3',
    type: 'Swap',
    tokenFrom: 'AVAX',
    tokenTo: 'ETH',
    amountFrom: 50,
    amountTo: 1.25,
    value: 4320.98,
    date: '2025-05-14T18:45:12Z',
    status: 'completed',
    hash: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
    fee: 0.05,
    feeValue: 1.73,
  },
  {
    id: 'tx4',
    type: 'Swap',
    tokenFrom: 'BTC',
    tokenTo: 'USDT',
    amountFrom: 0.05,
    amountTo: 3245,
    value: 3245.00,
    date: '2025-05-12T09:34:56Z',
    status: 'completed',
    hash: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef',
    fee: 0.00005,
    feeValue: 3.25,
  },
  {
    id: 'tx5',
    type: 'Swap',
    tokenFrom: 'MATIC',
    tokenTo: 'SOL',
    amountFrom: 500,
    amountTo: 4.32,
    value: 532.65,
    date: '2025-05-10T15:23:11Z',
    status: 'completed',
    hash: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef',
    fee: 0.5,
    feeValue: 0.44,
  },
  {
    id: 'tx6',
    type: 'Swap',
    tokenFrom: 'LINK',
    tokenTo: 'ETH',
    amountFrom: 75,
    amountTo: 0.32,
    value: 1105.60,
    date: '2025-05-08T11:12:45Z',
    status: 'completed',
    hash: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef',
    fee: 0.075,
    feeValue: 1.08,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selectedTx, setSelectedTx] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = mockTransactions.filter(tx => 
    tx.tokenFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.tokenTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by token or transaction hash"
            className="pl-10 bg-white/5 border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">No transactions found</p>
                </CardContent>
              </Card>
            ) : (
              filteredTransactions.map(tx => (
                <Card 
                  key={tx.id} 
                  className={`bg-white/5 border-white/10 cursor-pointer transition-colors ${
                    selectedTx === tx.id ? 'ring-1 ring-purple-500/50' : ''
                  }`}
                  onClick={() => setSelectedTx(selectedTx === tx.id ? null : tx.id)}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="text-sm text-muted-foreground">
                          {formatDate(tx.date)}
                        </div>
                        <div className="font-medium">
                          {tx.type}
                        </div>
                      </div>
                      
                      <div className="md:col-span-4 flex items-center">
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <div className="text-base font-medium">
                              {tx.amountFrom} {tx.tokenFrom}
                            </div>
                            <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                            <div className="text-base font-medium">
                              {tx.amountTo} {tx.tokenTo}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Value: ${tx.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 text-right">
                        <div className="text-sm font-medium">
                          Fee: {tx.fee} {tx.tokenFrom}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${tx.feeValue.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 text-right">
                        <div className={`text-sm font-medium capitalize ${
                          tx.status === 'completed' ? 'text-green-500' : 
                          tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {tx.status}
                        </div>
                        <a 
                          href={`https://etherscan.io/tx/${tx.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {truncateAddress(tx.hash)}
                        </a>
                      </div>
                    </div>
                    
                    {selectedTx === tx.id && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium mb-2">Transaction Details</div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-muted-foreground">Hash:</div>
                              <div className="col-span-2 truncate">
                                <a 
                                  href={`https://etherscan.io/tx/${tx.hash}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-purple-400 transition-colors"
                                >
                                  {tx.hash}
                                </a>
                              </div>
                              
                              <div className="text-muted-foreground">Status:</div>
                              <div className="col-span-2 capitalize">{tx.status}</div>
                              
                              <div className="text-muted-foreground">Date:</div>
                              <div className="col-span-2">{formatDate(tx.date)}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Swap Details</div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-muted-foreground">From:</div>
                              <div className="col-span-2">{tx.amountFrom} {tx.tokenFrom}</div>
                              
                              <div className="text-muted-foreground">To:</div>
                              <div className="col-span-2">{tx.amountTo} {tx.tokenTo}</div>
                              
                              <div className="text-muted-foreground">Rate:</div>
                              <div className="col-span-2">1 {tx.tokenFrom} = {(tx.amountTo / tx.amountFrom).toFixed(6)} {tx.tokenTo}</div>
                              
                              <div className="text-muted-foreground">Value:</div>
                              <div className="col-span-2">${tx.value.toFixed(2)}</div>
                              
                              <div className="text-muted-foreground">Fee:</div>
                              <div className="col-span-2">{tx.fee} {tx.tokenFrom} (${tx.feeValue.toFixed(2)})</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={`https://etherscan.io/tx/${tx.hash}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              View on Explorer
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="swaps" className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">No swap transactions found</p>
                </CardContent>
              </Card>
            ) : (
              filteredTransactions.map(tx => (
                <Card 
                  key={tx.id} 
                  className={`bg-white/5 border-white/10 cursor-pointer transition-colors ${
                    selectedTx === tx.id ? 'ring-1 ring-purple-500/50' : ''
                  }`}
                  onClick={() => setSelectedTx(selectedTx === tx.id ? null : tx.id)}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="text-sm text-muted-foreground">
                          {formatDate(tx.date)}
                        </div>
                        <div className="font-medium">
                          {tx.type}
                        </div>
                      </div>
                      
                      <div className="md:col-span-4 flex items-center">
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <div className="text-base font-medium">
                              {tx.amountFrom} {tx.tokenFrom}
                            </div>
                            <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                            <div className="text-base font-medium">
                              {tx.amountTo} {tx.tokenTo}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Value: ${tx.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 text-right">
                        <div className="text-sm font-medium">
                          Fee: {tx.fee} {tx.tokenFrom}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${tx.feeValue.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 text-right">
                        <div className={`text-sm font-medium capitalize ${
                          tx.status === 'completed' ? 'text-green-500' : 
                          tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {tx.status}
                        </div>
                        <a 
                          href={`https://etherscan.io/tx/${tx.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {truncateAddress(tx.hash)}
                        </a>
                      </div>
                    </div>
                    
                    {selectedTx === tx.id && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium mb-2">Transaction Details</div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-muted-foreground">Hash:</div>
                              <div className="col-span-2 truncate">
                                <a 
                                  href={`https://etherscan.io/tx/${tx.hash}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-purple-400 transition-colors"
                                >
                                  {tx.hash}
                                </a>
                              </div>
                              
                              <div className="text-muted-foreground">Status:</div>
                              <div className="col-span-2 capitalize">{tx.status}</div>
                              
                              <div className="text-muted-foreground">Date:</div>
                              <div className="col-span-2">{formatDate(tx.date)}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Swap Details</div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-muted-foreground">From:</div>
                              <div className="col-span-2">{tx.amountFrom} {tx.tokenFrom}</div>
                              
                              <div className="text-muted-foreground">To:</div>
                              <div className="col-span-2">{tx.amountTo} {tx.tokenTo}</div>
                              
                              <div className="text-muted-foreground">Rate:</div>
                              <div className="col-span-2">1 {tx.tokenFrom} = {(tx.amountTo / tx.amountFrom).toFixed(6)} {tx.tokenTo}</div>
                              
                              <div className="text-muted-foreground">Value:</div>
                              <div className="col-span-2">${tx.value.toFixed(2)}</div>
                              
                              <div className="text-muted-foreground">Fee:</div>
                              <div className="col-span-2">{tx.fee} {tx.tokenFrom} (${tx.feeValue.toFixed(2)})</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={`https://etherscan.io/tx/${tx.hash}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              View on Explorer
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}