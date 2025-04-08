"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 lg:py-10 dark:text-white text-gray-600 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
        {/* Brand Section */}
        <div className="flex flex-col justify-between w-full dark:text-white text-gray-600">
          <h1 className="text-lg sm:text-xl font-semibold">CYCLESPACE EXCHANGE</h1>
          <h2 className="text-sm sm:text-base font-semibold mt-2">
            Powered by Li.fi
          </h2>
        </div>

        {/* Learn Section */}
        <div className="flex flex-col gap-3 sm:gap-4 dark:text-white text-gray-400">
          <h1 className="  sm:text-lg font-semibold dark:text-white text-gray-600">Learn</h1>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Swap Tokens
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Cross Chain
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            News
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Company
          </Link>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-3 sm:gap-4 dark:text-white text-gray-400">
          <h1 className="text-base sm:text-lg font-semibold dark:text-white text-gray-600">Support</h1>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Help Center
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Request a Feature
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            FAQs
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Getting Started
          </Link>
          <Link href="/" className=" text-sm  hover:text-white transition-colors">
            Brand Assets
          </Link>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-3 sm:gap-4 dark:text-white text-gray-400">
          <h1 className="text-base sm:text-lg font-semibold dark:text-white text-gray-600">Legal</h1>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Privacy
          </Link>
        </div>

        {/* Community Section */}
        <div className="flex flex-col gap-3 sm:gap-4 dark:text-white text-gray-400">
          <h1 className="text-base sm:text-lg font-semibold dark:text-white text-gray-600">Community</h1>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            X.com
          </Link>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Instagram
          </Link>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Discord
          </Link>
          <Link href="/" className="text-sm  hover:text-white transition-colors">
            Youtube
          </Link>
        </div>
      </div>
    </footer>
  );
}