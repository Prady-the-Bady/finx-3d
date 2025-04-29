function DashboardContent() {
  const { walletAddress } = useWallet();
  const [balance, setBalance] = useState<Balance>({ eth: 0, btc: 0, usdc: 0 });
  const [isDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return null; // Avoid rendering anything during SSR
  }

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
            <PaymentSection balance={balance.usdc || 0} isDarkMode={isDarkMode} />
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