"use client"; // <-- ADD THIS AS THE VERY FIRST LINE

import { useState, useEffect } from "react";
import { PaymentSection } from "@/components/payment-section";
import { CurrencyExchangeComparison } from "@/components/currency-exchange-comparison";
import { useWallet } from "@/components/wallet-context";

interface Balance {
  eth: number;
  btc: number;
  usdc: number;
}

function PaymentsPageContent() {
  const { walletAddress } = useWallet();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [isDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      const fetchBalance = async () => {
        setBalance({
          eth: 2.34,
          btc: 0.78,
          usdc: 3200,
        });
      };
      fetchBalance();
    }
  }, [walletAddress]);

  if (!isMounted) {
    return null;
  }

  if (!balance) {
    return (
      <div className="text-center text-gray-400">
        Loading balance...
      </div>
    );
  }

  return (
    <>
      {walletAddress ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaymentSection balance={balance.usdc} isDarkMode={isDarkMode} />
          <CurrencyExchangeComparison isDarkMode={isDarkMode} />
        </div>
      ) : (
        <div className="text-center text-gray-400">
          Connect your wallet to view payment options and currency comparisons.
        </div>
      )}
    </>
  );
}

export default PaymentsPageContent;
