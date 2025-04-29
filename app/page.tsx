import { PageLayout } from "@/components/page-layout";

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Account Overview</h2>
          <p>Balance: 0.00 USD</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Currency Converter</h2>
          <p>Convert between currencies</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">AI Advisor</h2>
          <p>Smart financial advice by AI.</p>
        </div>
      </div>
    </PageLayout>
  );
}
