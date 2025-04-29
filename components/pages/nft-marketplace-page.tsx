"use client"

import { PageLayout } from "@/components/pages/page-layout"

export function NFTMarketplacePage() {
  return (
    <PageLayout title="NFT Marketplace">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="aspect-square bg-slate-700 rounded-lg mb-3"></div>
          <h3 className="font-medium">Crypto Punk #1234</h3>
          <p className="text-sm text-slate-400">Floor: 10.5 ETH</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="aspect-square bg-slate-700 rounded-lg mb-3"></div>
          <h3 className="font-medium">Bored Ape #5678</h3>
          <p className="text-sm text-slate-400">Floor: 68.2 ETH</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="aspect-square bg-slate-700 rounded-lg mb-3"></div>
          <h3 className="font-medium">Azuki #9012</h3>
          <p className="text-sm text-slate-400">Floor: 12.8 ETH</p>
        </div>
      </div>
    </PageLayout>
  )
}
