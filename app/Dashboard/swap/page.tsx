"use client";

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ArrowDownUp, 
  Settings, 
  Info, 
  Clock, 
  ChevronDown, 
  Search, 
  Check, 
  ArrowDown 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AreaChart } from '@/components/ui/chart';

// Mock data
const mockTokens = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 1.5432, price: 3456.78, color: 'bg-cyan-500/20' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.0567, price: 65432.10, color: 'bg-orange-500/20' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 25.123, price: 123.45, color: 'bg-purple-500/20' },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', balance: 12.34, price: 34.56, color: 'bg-red-500/20' },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', balance: 45.67, price: 14.35, color: 'bg-blue-500/20' },
  { id: 'matic', name: 'Polygon', symbol: 'MATIC', balance: 543.21, price: 0.87, color: 'bg-indigo-500/20' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: 1265.43, price: 1.0, color: 'bg-green-500/20' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: 876.54, price: 1.0, color: 'bg-green-500/20' },
];

const mockPriceChartData = [
  { name: '00:00', value: 3426.12 },
  { name: '04:00', value: 3456.78 },
  { name: '08:00', value: 3398.54 },
  { name: '12:00', value: 3432.98 },
  { name: '16:00', value: 3475.32 },
  { name: '20:00', value: 3456.78 },
  { name: '24:00', value: 3467.21 },
];

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0.0288');
  const [slippage, setSlippage] = useState(0.5);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTokenDialogType, setSelectedTokenDialogType] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredTokens = mockTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // In a real app, we'd calculate the toAmount based on exchange rate
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setToAmount((numericValue * 0.0288).toFixed(6));
    } else {
      setToAmount('0');
    }
  };
  
  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    // In a real app, we'd calculate the fromAmount based on exchange rate
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setFromAmount((numericValue / 0.0288).toFixed(6));
    } else {
      setFromAmount('0');
    }
  };
  
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };
  
  const handleSelectToken = (token: typeof mockTokens[0]) => {
    if (selectedTokenDialogType === 'from') {
      if (token.id === toToken.id) {
        setToToken(fromToken);
      }
      setFromToken(token);
    } else {
      if (token.id === fromToken.id) {
        setFromToken(toToken);
      }
      setToToken(token);
    }
  };
  
  const exchangeRate = parseFloat(toAmount) / parseFloat(fromAmount);
  const fromTokenUsdValue = parseFloat(fromAmount) * fromToken.price;
  const toTokenUsdValue = parseFloat(toAmount) * toToken.price;
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="flex-1 p-4 pt-6 md:p-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Swap</h2>
          <p className="text-muted-foreground">Trade tokens with the best rates and lowest fees</p>
        </div>
        
        <Tabs defaultValue="swap" className="mb-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="swap">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Background gradient effects */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] -z-10" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] -z-10" />
              
              <CardHeader className="pb-4">
                <div className="flex justify-between">
                  <CardTitle>Swap Tokens</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Trade any token at the best possible rate
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* From Token Input */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>You Pay</span>
                    <span className="text-muted-foreground">
                      Balance: {fromToken.balance.toFixed(4)} {fromToken.symbol}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => setSelectedTokenDialogType('from')}
                        >
                          <div className={`h-5 w-5 rounded-full ${fromToken.color} flex items-center justify-center`}>
                            <span className="text-xs font-bold">{fromToken.symbol.slice(0, 1)}</span>
                          </div>
                          {fromToken.symbol}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Select a token</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center border rounded-md p-2 mb-4">
                          <Search className="h-4 w-4 mr-2 opacity-50" />
                          <Input 
                            placeholder="Search by name or symbol"
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="max-h-80 overflow-y-auto pr-2">
                          {filteredTokens.map(token => (
                            <div 
                              key={token.id}
                              className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                              onClick={() => {
                                handleSelectToken(token);
                                setSearchQuery('');
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-full ${token.color} flex items-center justify-center`}>
                                  <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{token.name}</p>
                                  <p className="text-sm text-muted-foreground">{token.symbol}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{token.balance.toFixed(4)}</p>
                                <p className="text-sm text-muted-foreground">${(token.balance * token.price).toFixed(2)}</p>
                              </div>
                              {(fromToken.id === token.id && selectedTokenDialogType === 'from') || 
                               (toToken.id === token.id && selectedTokenDialogType === 'to') ? (
                                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ml-2">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="flex-1 relative">
                      <Input 
                        type="text"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                        className="pr-20 bg-white/5 border-white/10"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Button variant="ghost" size="sm" className="h-6 text-xs px-1.5">MAX</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-right text-muted-foreground">
                    ≈ ${fromTokenUsdValue.toFixed(2)}
                  </div>
                </div>
                
                {/* Swap Button */}
                <div className="flex justify-center -my-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white/5 z-10"
                    onClick={handleSwapTokens}
                  >
                    <ArrowDownUp className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* To Token Input */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>You Receive</span>
                    <span className="text-muted-foreground">
                      Balance: {toToken.balance.toFixed(4)} {toToken.symbol}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => setSelectedTokenDialogType('to')}
                        >
                          <div className={`h-5 w-5 rounded-full ${toToken.color} flex items-center justify-center`}>
                            <span className="text-xs font-bold">{toToken.symbol.slice(0, 1)}</span>
                          </div>
                          {toToken.symbol}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Select a token</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center border rounded-md p-2 mb-4">
                          <Search className="h-4 w-4 mr-2 opacity-50" />
                          <Input 
                            placeholder="Search by name or symbol"
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="max-h-80 overflow-y-auto pr-2">
                          {filteredTokens.map(token => (
                            <div 
                              key={token.id}
                              className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                              onClick={() => {
                                handleSelectToken(token);
                                setSearchQuery('');
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-full ${token.color} flex items-center justify-center`}>
                                  <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{token.name}</p>
                                  <p className="text-sm text-muted-foreground">{token.symbol}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{token.balance.toFixed(4)}</p>
                                <p className="text-sm text-muted-foreground">${(token.balance * token.price).toFixed(2)}</p>
                              </div>
                              {(fromToken.id === token.id && selectedTokenDialogType === 'from') || 
                               (toToken.id === token.id && selectedTokenDialogType === 'to') ? (
                                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ml-2">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Input 
                      type="text"
                      value={toAmount}
                      onChange={(e) => handleToAmountChange(e.target.value)}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="text-sm text-right text-muted-foreground">
                    ≈ ${toTokenUsdValue.toFixed(2)}
                  </div>
                </div>
                
                {/* Rate Info */}
                <div className="text-sm text-center text-muted-foreground bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex justify-between">
                    <span>Exchange Rate</span>
                    <span>
                      1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Price Impact</span>
                    <span className="text-green-500">
                      &lt; 0.01%
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Min. Received</span>
                    <span>
                      {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken.symbol}
                    </span>
                  </div>
                </div>
                
                {/* Transaction Settings */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="settings" className="border-white/10">
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Transaction Settings
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Slippage Tolerance</span>
                            <span className="text-sm">{slippage}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Slider 
                              defaultValue={[0.5]} 
                              max={2} 
                              step={0.1}
                              onValueChange={(value) => setSlippage(value[0])}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0.1%</span>
                            <span>2%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Transaction Deadline</span>
                          <div className="flex items-center">
                            <Input 
                              type="number" 
                              value="30" 
                              className="w-16 h-8 text-right mr-2 bg-white/5 border-white/10"
                            />
                            <span className="text-sm text-muted-foreground">minutes</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Price Chart */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Price Chart</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      24h
                    </div>
                  </div>
                  <div className="h-[120px] w-full">
                    <AreaChart 
                      data={mockPriceChartData}
                      index="name"
                      categories={["value"]}
                      colors={["hsl(var(--chart-1))"]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      showAnimation
                      showLegend={false}
                      showXAxis={false}
                      showGridLines={false}
                      showTooltip={true}
                      className="h-[120px]"
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  Connect Wallet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="limit">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Limit Orders</CardTitle>
                <CardDescription>
                  Set a specific price to execute your trade
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">
                    Limit orders coming soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}