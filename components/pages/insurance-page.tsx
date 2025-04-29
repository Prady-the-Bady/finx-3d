"use client"

import { PageLayout } from "@/components/pages/page-layout"

export function InsurancePage() {
  return (
    <PageLayout title="Insurance">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">DeFi Coverage</h2>
          <p className="text-slate-300 mb-4">Protect your assets against smart contract risks and hacks.</p>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Aave Coverage</span>
                <span className="text-amber-400">2.5% Premium</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Coverage amount</span>
                <span>Up to 100,000 USDC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Wallet Insurance</h2>
          <p className="text-slate-300 mb-4">Protect against private key loss and theft.</p>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Basic Coverage</span>
                <span className="text-amber-400">1.8% Premium</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Coverage amount</span>
                <span>Up to 5 ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
