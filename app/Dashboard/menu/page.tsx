"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AreaChart, BarChart } from '@/components/ui/chart';
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  DollarSign,
  LineChart,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const portfolioValue = 12586.23;
const portfolioChangePercent = 2.5;
const portfolioChangeAmount = 305.67;

const mockAreaChartData = [
  { name: 'Jan', value: 6000 },
  { name: 'Feb', value: 8000 },
  { name: 'Mar', value: 7200 },
  { name: 'Apr', value: 9000 },
  { name: 'May', value: 8700 },
  { name: 'Jun', value: 10200 },
  { name: 'Jul', value: 11500 },
  { name: 'Aug', value: 10800 },
  { name: 'Sep', value: 12500 },
  { name: 'Oct', value: 12000 },
  { name: 'Nov', value: 12800 },
  { name: 'Dec', value: 12586 },
];

const mockBarChartData = [
  { name: 'BTC', value: 5623.45 },
  { name: 'ETH', value: 3542.67 },
  { name: 'SOL', value: 1345.89 },
  { name: 'AVAX', value: 876.45 },
  { name: 'MATIC', value: 654.32 },
  { name: 'LINK', value: 543.45 },
];

const recentTransactions = [
  {
    id: 'tx1',
    type: 'Swap',
    tokenFrom: 'ETH',
    tokenTo: 'BTC',
    amountFrom: 1.5,
    amountTo: 0.078,
    date: '2 hours ago',
    status: 'completed',
  },
  {
    id: 'tx2',
    type: 'Swap',
    tokenFrom: 'SOL',
    tokenTo: 'USDC',
    amountFrom: 25,
    amountTo: 2450,
    date: '5 hours ago',
    status: 'completed',
  },
  {
    id: 'tx3',
    type: 'Swap',
    tokenFrom: 'AVAX',
    tokenTo: 'ETH',
    amountFrom: 50,
    amountTo: 1.25,
    date: '1 day ago',
    status: 'completed',
  },
  {
    id: 'tx4',
    type: 'Swap',
    tokenFrom: 'BTC',
    tokenTo: 'USDT',
    amountFrom: 0.05,
    amountTo: 3245,
    date: '3 days ago',
    status: 'completed',
  },
];

export default function DashboardMenu() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild variant="default">
            <Link href="/dashboard/swap">
              <Wallet className="mr-2 h-4 w-4" />
              Swap Tokens
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
                <div className="flex items-center space-x-2">
                  {portfolioChangePercent >= 0 ? (
                    <span className="text-green-500 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      {portfolioChangePercent}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center text-sm">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      {Math.abs(portfolioChangePercent)}%
                    </span>
                  )}
                  <span className="text-muted-foreground text-sm">
                    {portfolioChangePercent >= 0 ? '+' : '-'}${Math.abs(portfolioChangeAmount).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Assets
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Across 5 blockchains
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Swaps
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +5 from last week
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fees Saved
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$123.56</div>
                <p className="text-xs text-muted-foreground">
                  Compared to other platforms
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
            <Card className="col-span-1 md:col-span-4 bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>
                  Your portfolio value over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AreaChart 
                    data={mockAreaChartData}
                    index="name"
                    categories={["value"]}
                    colors={["hsl(var(--chart-1))"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    showAnimation
                    showLegend={false}
                    showGridLines={false}
                    showTooltip={true}
                    className="h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-3 bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Assets Distribution</CardTitle>
                <CardDescription>
                  Breakdown of your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart 
                    data={mockBarChartData}
                    index="name"
                    categories={["value"]}
                    colors={["hsl(var(--chart-2))"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    showAnimation
                    showLegend={false}
                    showGridLines={false}
                    className="h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest swap transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/10 p-2 rounded-full">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm">
                          {tx.amountFrom} {tx.tokenFrom} → {tx.amountTo} {tx.tokenTo}
                        </p>
                        <p className="text-xs text-green-500 capitalize">{tx.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/history">
                    View All Transactions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Your Assets</CardTitle>
              <CardDescription>
                Overview of all your crypto assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Asset details will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Analytics data will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}