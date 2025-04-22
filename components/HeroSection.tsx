"use client";

import { motion } from "framer-motion";
import { Globe } from "./Globe";

export function HeroSection() {
  return (
    <div className="relative mx-auto my-0 flex max-w-full flex-col items-start justify-start px-4 sm:px-0 lg:px-0 w-full">
      {/* Globe background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Globe className="w-[250px] h-[250px] md:w-[250px] md:h-[250px] opacity-30" />
      </div>
      <div className="relative z-10 pt-8 sm:pt-10 md:pt-20 justify-start items-start w-fu">
        <h1 className="relative justify-start items-start w-full z-20 mx-auto max-w-3xl space-y-5 text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black dark:text-white">
          {"Trade and explore over 7 million tokens"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-2 sm:py-4 text-center text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          {/* Add your paragraph text here */}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-6 sm:mt-8 flex flex-wrap items-start justify-start gap-4"
        >
          <button className="w-full sm:w-auto transform rounded-full border border-[#BAFD02] bg-[#BAFD02] px-6 py-2 font- text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#BAFD02]/80 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Start Trading
          </button>
        </motion.div>
      </div>
    </div>
  );
}