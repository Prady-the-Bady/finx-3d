"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletIcon, ArrowRight, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletProps {
  onConnect: (walletType: string) => void
  isDarkMode?: boolean
}

export function Wallet({ onConnect, isDarkMode = true }: WalletProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const { toast } = useToast()

  const handleConnect = (walletType: string) => {
    setSelectedWallet(walletType)
    setIsConnecting(true)

    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false)
      onConnect(walletType)
    }, 1500)
  }

  const walletOptions = [
    {
      name: "MetaMask",
      description: "Connect to your MetaMask wallet",
      icon: (
        <svg width="24" height="24" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32.5 15.5C32.5 24.0604 25.3604 31 16.5 31C7.63959 31 0.5 24.0604 0.5 15.5C0.5 6.93959 7.63959 0 16.5 0C25.3604 0 32.5 6.93959 32.5 15.5Z"
            fill="#F5841F"
          />
          <path
            d="M16.9229 6.49963L16.5029 7.74963V20.1496L16.9229 20.5496L22.6729 17.1996L16.9229 6.49963Z"
            fill="white"
          />
          <path d="M16.9229 6.49963L11.1729 17.1996L16.9229 20.5496V13.9996V6.49963Z" fill="#C1C1C1" />
          <path
            d="M16.9229 21.7996L16.7129 22.0496V25.8996L16.9229 26.4996L22.6729 18.4496L16.9229 21.7996Z"
            fill="#C1C1C1"
          />
          <path d="M16.9229 26.4996V21.7996L11.1729 18.4496L16.9229 26.4996Z" fill="#8D8D8D" />
          <path d="M16.9229 20.5496L22.6729 17.1996L16.9229 13.9996V20.5496Z" fill="#8D8D8D" />
          <path d="M11.1729 17.1996L16.9229 20.5496V13.9996L11.1729 17.1996Z" fill="#C1C1C1" />
        </svg>
      ),
      bgColor: "bg-orange-100",
    },
    {
      name: "WalletConnect",
      description: "Scan with WalletConnect to connect",
      icon: (
        <svg width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48C0 21.4903 21.4903 0 48 0C74.5097 0 96 21.4903 96 48Z"
            fill="#3B99FC"
          />
          <path
            d="M29.4 47.4001C29.4 45.4001 31 43.8001 33 43.8001H44.2C46.2 43.8001 47.8 45.4001 47.8 47.4001V58.6001C47.8 60.6001 46.2 62.2001 44.2 62.2001H33C31 62.2001 29.4 60.6001 29.4 58.6001V47.4001Z"
            fill="white"
          />
          <path
            d="M52.6 37.4001C52.6 35.4001 54.2 33.8001 56.2 33.8001H67.4C69.4 33.8001 71 35.4001 71 37.4001V58.6001C71 60.6001 69.4 62.2001 67.4 62.2001H56.2C54.2 62.2001 52.6 60.6001 52.6 58.6001V37.4001Z"
            fill="white"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
    },
    {
      name: "Coinbase Wallet",
      description: "Connect to Coinbase Wallet",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
            fill="#0052FF"
          />
          <path
            d="M12.0001 4.80005C8.00008 4.80005 4.80008 8.00005 4.80008 12C4.80008 16 8.00008 19.2 12.0001 19.2C16.0001 19.2 19.2001 16 19.2001 12C19.2001 8.00005 16.0001 4.80005 12.0001 4.80005ZM15.2001 12.8H12.8001V15.2C12.8001 15.6418 12.4419 16 12.0001 16C11.5583 16 11.2001 15.6418 11.2001 15.2V12.8H8.80008C8.35829 12.8 8.00008 12.4418 8.00008 12C8.00008 11.5582 8.35829 11.2 8.80008 11.2H11.2001V8.80005C11.2001 8.35826 11.5583 8.00005 12.0001 8.00005C12.4419 8.00005 12.8001 8.35826 12.8001 8.80005V11.2H15.2001C15.6419 11.2 16.0001 11.5582 16.0001 12C16.0001 12.4418 15.6419 12.8 15.2001 12.8Z"
            fill="white"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
    },
    {
      name: "Trust Wallet",
      description: "Connect to Trust Wallet",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
            fill="#0500FF"
          />
          <path
            d="M12 5.25L7.5 7.5V12C7.5 14.4853 9.01472 16.7353 12 18C14.9853 16.7353 16.5 14.4853 16.5 12V7.5L12 5.25Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bgColor: "bg-indigo-100",
    },
  ]

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card
        className={`w-full max-w-md ${isDarkMode ? "bg-slate-800/50 border-slate-700 text-white" : "bg-white/50 border-slate-200 text-slate-900"} backdrop-blur-sm`}
      >
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <WalletIcon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Connect Your Wallet
          </CardTitle>
          <CardDescription className={isDarkMode ? "text-slate-300" : "text-slate-600"}>
            Connect your wallet to access the FinX Ultimate platform and manage your digital assets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {walletOptions.map((wallet) => (
            <div
              key={wallet.name}
              className={`${
                isDarkMode ? "bg-slate-700/50 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"
              } rounded-lg p-4 flex items-center justify-between transition-colors cursor-pointer`}
              onClick={() => handleConnect(wallet.name)}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${wallet.bgColor} flex items-center justify-center mr-3`}>
                  {wallet.icon}
                </div>
                <div>
                  <p className="font-medium">{wallet.name}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{wallet.description}</p>
                </div>
              </div>
              {isConnecting && selectedWallet === wallet.name ? (
                <Loader2 className={`h-5 w-5 animate-spin ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
              ) : (
                <ArrowRight className={isDarkMode ? "h-5 w-5 text-slate-400" : "h-5 w-5 text-slate-500"} />
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={() => handleConnect("MetaMask")}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
            size="lg"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>
          <p className={`text-xs text-center ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
