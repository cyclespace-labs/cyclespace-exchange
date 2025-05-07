import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MAINNET_TOKENS, MAINNET_TOKENS_BY_SYMBOL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ChevronLeft } from "lucide-react";

interface TokenPickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TokenPicker({ value, onValueChange }: TokenPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = MAINNET_TOKENS.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-fit h-7 p-6 px-4 rounded-full bg-transparent border-none justify-between shadow shadow-zinc-950 "
      >
        {value ? (
          <>
            <Avatar className="h-8 w-8">
              <AvatarImage src={MAINNET_TOKENS_BY_SYMBOL[value]?.logoURI} />
            </Avatar>
            <span className="font-medium text-black dark:text-white">{value.toUpperCase()}</span>
          </>
        ) : (
          "Select Token"
        )}
        <ChevronDown size={23} color="grey" strokeWidth={3}  className="" />
      </Button>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-black/30"
          onClick={() => setOpen(false)}
        >
          <div 
            className="relative max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="rounded-3xl border bg-slate-100 dark:bg-slate-800 shadow-lg p-5 flex-col flex max-h-[80vh]">
              <div className="w-full flex-row h-fit my-2 relative items-start justify-between flex">
                <CommandInput
                  placeholder="Search token..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="border-none focus:outline-none active:outline-none w-full h-fit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-transparent px-2 bg-blue-600 w-fit h-fit flex p-2 font-semibold rounded-xl"
                >
                  <ChevronLeft color="white" className="h-4 w-4" />
                  <p className="font-semibold">Back</p>
                </Button>
              </div>

              <ScrollArea className="h-[60vh]">
                <CommandList>
                  <CommandEmpty>No token found.</CommandEmpty>
                  {filteredTokens.map((token) => (
                    <CommandItem
                      key={token.address}
                      value={token.address}
                      onSelect={() => {
                        onValueChange(token.symbol.toLowerCase());
                        setOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-4 p-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-800 rounded-3xl"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={token.logoURI} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 justify-between">
                          <span className="font-semibold">{token.symbol}</span>
                          <span className="text-xs text-slate-500">
                            {token.address.slice(0, 6)}...{token.address.slice(-4)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              </ScrollArea>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
}