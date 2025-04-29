"use client"

import { PageLayout } from "@/components/pages/page-layout"

export function GovernancePage() {
  return (
    <PageLayout title="Governance">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Active Proposals</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">FIP-23: Treasury Allocation</h3>
              <p className="text-sm text-slate-400 mb-3">
                Proposal to allocate 5% of treasury funds to ecosystem development.
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">For: 65%</span>
                <span className="text-red-400">Against: 35%</span>
              </div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">FIP-24: Fee Structure Update</h3>
              <p className="text-sm text-slate-400 mb-3">Proposal to reduce platform fees by 0.1%.</p>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">For: 78%</span>
                <span className="text-red-400">Against: 22%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Voting Power</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">FinX Tokens</span>
                <span>250 FNX</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Voting Power</span>
                <span>0.025% of total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
