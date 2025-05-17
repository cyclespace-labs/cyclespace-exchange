"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Wallet,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
  isPro?: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, title, isActive, isPro, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/10",
        isActive ? "bg-white/10 text-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
      {isPro && (
        <span className="ml-auto text-xs bg-gradient-to-r from-purple-500 to-cyan-500 px-1.5 py-0.5 rounded-full">
          Pro
        </span>
      )}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };
  
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Sidebar - desktop always visible, mobile as overlay */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 md:translate-x-0 backdrop-blur-sm",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full border-r border-white/10 bg-black/60">
          <div className="px-6 py-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                SwapFlow
              </span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto py-2 px-4">
            <nav className="flex flex-col gap-1">
              <NavItem
                href="/dashboard"
                icon={LayoutDashboard}
                title="Dashboard"
                isActive={pathname === '/dashboard'}
                onClick={closeMobileSidebar}
              />
              <NavItem
                href="/dashboard/swap"
                icon={Wallet}
                title="Swap Tokens"
                isActive={pathname === '/dashboard/swap'}
                onClick={closeMobileSidebar}
              />
              <NavItem
                href="/dashboard/history"
                icon={History}
                title="Transaction History"
                isActive={pathname === '/dashboard/history'}
                onClick={closeMobileSidebar}
              />
              
              <Separator className="my-4 bg-white/10" />
              
              <div className="px-3 py-2">
                <h3 className="mb-2 text-xs font-medium text-muted-foreground">Pro Features</h3>
                <div className="space-y-1">
                  <NavItem
                    href="#"
                    icon={BarChart3}
                    title="Advanced Analytics"
                    isActive={false}
                    isPro={true}
                    onClick={closeMobileSidebar}
                  />
                  <NavItem
                    href="#"
                    icon={CreditCard}
                    title="DCA Trading"
                    isActive={false}
                    isPro={true}
                    onClick={closeMobileSidebar}
                  />
                </div>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <NavItem
                href="#"
                icon={Settings}
                title="Settings"
                isActive={pathname === '/dashboard/settings'}
                onClick={closeMobileSidebar}
              />
            </nav>
          </div>
          
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-4">
                <p className="text-sm font-medium">Free Tier</p>
                <p className="text-xs text-muted-foreground">Upgrade to Pro for premium features</p>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700" 
                size="sm"
              >
                Upgrade Plan
              </Button>
            </div>
            
            <Separator className="my-4 bg-white/10" />
            
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:pl-72">
        {children}
      </div>
      
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeMobileSidebar}
        />
      )}
    </div>
  );
}