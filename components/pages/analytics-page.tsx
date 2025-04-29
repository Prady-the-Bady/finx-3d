"use client"

import { PageLayout } from "@/components/pages/page-layout"

export function AnalyticsPage() {
  return (
    <PageLayout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Portfolio Performance</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Portfolio Chart Placeholder</p>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Value</p>
              <p className="font-medium">$1,245.67</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">24h Change</p>
              <p className="font-medium text-green-400">+$62.28 (5.2%)</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Asset Allocation</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Allocation Chart Placeholder</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <p className="text-sm">BTC (40%)</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <p className="text-sm">ETH (25%)</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <p className="text-sm">MATIC (15%)</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
              <p className="text-sm">USDC (20%)</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
