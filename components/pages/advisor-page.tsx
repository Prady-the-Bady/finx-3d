"use client"

import { PageLayout } from "@/components/pages/page-layout"
import { AdvisorSection } from "@/components/advisor-section"
import { Wallet } from "@/components/wallet"
import { useWallet } from "@/components/wallet-context"
import { useState } from "react"

export function AdvisorPageContent() {
  const { isConnected, balance, connectWallet } = useWallet()
  const [isDarkMode] = useState(true) // Add local state for isDarkMode

  return (
    <>
      {!isConnected ? (
        <Wallet onConnect={connectWallet} isDarkMode={isDarkMode} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdvisorSection balance={balance} isDarkMode={true} />
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">AI-Powered Investment Insights</h2>
            <p className="text-slate-300 mb-4">
              Our advanced AI analyzes market trends, on-chain data, and your portfolio to provide personalized
              investment recommendations.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Market Sentiment Analysis</h3>
                <p className="text-sm text-slate-400">
                  Current market sentiment: <span className="text-green-400">Bullish</span>
                </p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Risk Assessment</h3>
                <p className="text-sm text-slate-400">
                  Your portfolio risk level: <span className="text-amber-400">Moderate</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function AdvisorPage() {
  return (
    <PageLayout title="AI Advisor">
      <AdvisorPageContent />
    </PageLayout>
  )
}
