"use client";

import { useState, useEffect } from "react";
import { WalletProvider, useWallet } from "@/components/wallet-context";
import { AccountOverview } from "@/components/account-overview";
import { CurrencyConverter } from "@/components/currency-converter";
import { AdvisorSection } from "@/components/advisor-section";
import { PaymentSection } from "@/components/payment-section";
import { CurrencyExchangeComparison } from "@/components/currency-exchange-comparison";
import { PageLayout } from "@/components/page-layout";

interface Balance {
  eth: number;
  btc: number;
  usdc: number;
}

function DashboardContent() {
  const { walletAddress } = useWallet();
  const [balance, setBalance] = useState<Balance>({ eth: 0, btc: 0, usdc: 0 });
  const [isDarkMode] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      // Simulate fetching balance from API or blockchain
      const fetchBalance = async () => {
        setBalance({
          eth: 1.23,
          btc: 0.45,
          usdc: 1500,
        });
      };
      fetchBalance();
    }
  }, [walletAddress]);

  return (
    <PageLayout title="Dashboard">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountOverview balance={balance} isDarkMode={isDarkMode} />
          <CurrencyConverter balance={balance} isDarkMode={isDarkMode} />
          <AdvisorSection balance={balance} isDarkMode={isDarkMode} />
        </div>

        {walletAddress ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PaymentSection balance={balance?.usdc || 0} isDarkMode={isDarkMode} />
            <CurrencyExchangeComparison isDarkMode={isDarkMode} />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            Connect your wallet to view payment options and currency comparisons.
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default function DashboardPage() {
  return (
    <WalletProvider>
      <DashboardContent />
    </WalletProvider>
  );
}
