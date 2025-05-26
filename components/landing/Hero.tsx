"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    setAnimationReady(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 bg-grid-white/[0.02] -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 100% 0%, rgba(120, 41, 190, 0.25) 0%, transparent 25%),
            radial-gradient(circle at 0% 100%, rgba(0, 153, 255, 0.25) 0%, transparent 25%)
          `,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      />
      
      {/* Subtle animated grid overlay (optional) */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      
      <div className="w-full px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 md:py-24">
          <div className={`space-y-8 ${animationReady ? 'animate-in fade-in slide-in-from-left-8 duration-700' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block">Swap Crypto at</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Lightning Speed
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-md">
              The most advanced crypto swap platform with industry-leading rates and the lowest fees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                <Link href="/dashboard/swap">
                  Start Swapping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-xs font-medium">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">1,000+</span> traders joined this week
                </div>
              </div>
            </div>
          </div>
          
          <div className={`relative ${animationReady ? 'animate-in fade-in slide-in-from-right-8 duration-700 delay-150' : 'opacity-0'}`}>
            <div className="relative z-10 bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl p-6 lg:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
              <div className="relative">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="col-span-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-purple-500 text-xs font-bold">BTC</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Bitcoin</p>
                    <p className="text-sm font-medium">$65,432</p>
                  </div>
                  <div className="col-span-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <div className="h-8 w-8 bg-cyan-500/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-cyan-500 text-xs font-bold">ETH</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Ethereum</p>
                    <p className="text-sm font-medium">$3,456</p>
                  </div>
                  <div className="col-span-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <div className="h-8 w-8 bg-pink-500/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-pink-500 text-xs font-bold">SOL</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Solana</p>
                    <p className="text-sm font-medium">$123</p>
                  </div>
                </div>
              
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">You Pay</p>
                      <p className="text-sm text-muted-foreground">Balance: 1.25 ETH</p>
                    </div>
                    <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/5">
                      <div className="mr-3">
                        <div className="h-8 w-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                          <span className="text-cyan-500 text-xs font-bold">ETH</span>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        value="1.0" 
                        readOnly
                        className="bg-transparent border-none text-xl focus:outline-none flex-grow" 
                      />
                      <span className="text-sm text-muted-foreground">≈ $3,456</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/10">
                      <ArrowRight className="h-5 w-5 rotate-90" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">You Receive</p>
                      <p className="text-sm text-muted-foreground">Balance: 0 BTC</p>
                    </div>
                    <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/5">
                      <div className="mr-3">
                        <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <span className="text-purple-500 text-xs font-bold">BTC</span>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        value="0.05232"
                        readOnly 
                        className="bg-transparent border-none text-xl focus:outline-none flex-grow" 
                      />
                      <span className="text-sm text-muted-foreground">≈ $3,421</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee</span>
                      <span>0.1% ($3.45)</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Rate</span>
                      <span>1 ETH = 0.05232 BTC</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 -right-4 h-72 w-72 bg-purple-500/30 rounded-full blur-[100px]" />
            <div className="absolute -z-10 bottom-0 -left-4 h-72 w-72 bg-cyan-500/30 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}