// components/Navbar.tsx
"use client";

export function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      {/* Search bar */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search assets, transactions..."
          className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* Connect Wallet Button */}
      <div className="ml-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
