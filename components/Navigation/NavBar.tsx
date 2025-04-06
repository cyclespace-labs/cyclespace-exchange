"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { Tourney } from "next/font/google"
import { MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const _tourney = Tourney({ subsets: ['latin'] })

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full relative justify-center">
      {/* Desktop/Tablet Nav */}
      <NavigationMenu className="max-w-full w-full justify-between items-center px-4 md:px-8 py-3 hidden md:flex gap-20">
        <NavigationMenuList className="gap-8 md:gap-8">
          <NavigationMenuItem>
            <Link href="/" className={`${_tourney.className} antialiased text-xl md:text-2xl font-semibold text-[#BAFD02]`}>
              CYCLESPACE
            </Link>
          </NavigationMenuItem>

          <div className="hidden md:flex gap-4 lg:gap-8 text-white/80">
            <NavigationMenuItem>
              <Link href="Swap" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm lg:text-base")}>
                  Swap
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm lg:text-base")}>
                  Newsletter
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="Dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm lg:text-base")}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>

        <div className="flex gap-2 md:gap-4 items-center">
          <Button className="rounded-full text-black bg-[#BAFD02] px-3 md:px-4 text-sm md:text-base">
            Sign up
          </Button>
          <Button className="rounded-full text-black bg-white px-3 md:px-4 text-sm md:text-base">
            Login
          </Button>
        </div>
      </NavigationMenu>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center px-6 py-3 gap-20 w-full ">
        <Link href="/" className={`${_tourney.className} antialiased text-xl font-semibold text-[#BAFD02]`}>
          CYCLESPACE
        </Link>

        <Button 
          variant="ghost" 
          className="p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-background z-50"
          >
            <div className="flex flex-col items-center py-4 gap-4">
              <Link 
                href="/" 
                className="w-full text-center py-2 text-white hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Spot
              </Link>
              <Link 
                href="#" 
                className="w-full text-center py-2 text-white hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Newsletter
              </Link>
              <Link 
                href="#" 
                className="w-full text-center py-2 text-white hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              
              <div className="flex gap-4 mt-4">
                <Button className="rounded-full text-black bg-[#BAFD02] px-4">
                  Sign up
                </Button>
                <Button className="rounded-full text-black bg-white px-4">
                  Login
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}