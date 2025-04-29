import { WalletProvider } from "@/components/wallet-context"; // ✅ Import WalletProvider
import PaymentsPageContent from "@/components/pages/payments-page"; // ✅ Your PaymentsPageContent

export default function Payments() {
  return (
    <WalletProvider>
      <PaymentsPageContent />
    </WalletProvider>
  );
}
