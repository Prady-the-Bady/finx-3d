"use client"

import { PageLayout } from "@/components/pages/page-layout"
import { CrossChainBridge } from "@/components/cross-chain-bridge"
import { Wallet } from "@/components/wallet"
import { useWallet } from "@/components/wallet-context"
import { useState } from "react"

export function AssetBridgePageContent() {
  const { isConnected, connectWallet } = useWallet()
  const [isDarkMode] = useState(true) // Add local state for isDarkMode

  return (
    <>
      {!isConnected ? (
        <Wallet onConnect={connectWallet} isDarkMode={isDarkMode} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CrossChainBridge isDarkMode={isDarkMode} />
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Cross-Chain Transfers</h2>
            <p className="text-slate-300 mb-4">
              Move your assets seamlessly between different blockchains with our secure bridge technology.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Recent Bridges</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Ethereum → Polygon</span>
                    <span className="text-slate-300">0.5 ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Polygon → Arbitrum</span>
                    <span className="text-slate-300">100 MATIC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function AssetBridgePage() {
  return (
    <PageLayout title="Asset Bridge">
      <AssetBridgePageContent />
    </PageLayout>
  )
}
