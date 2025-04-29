"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  isConnected: boolean
  walletAddress: string
  onConnect: () => void
  onDisconnect: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function Header({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-end h-16 px-4 border-b border-slate-700 bg-transparent">
      <div className="flex items-center gap-4">
        {/* Wallet Connect/Disconnect */}
        {isConnected ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-slate-700"
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="text-white border-white hover:bg-slate-700"
            onClick={onConnect}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
