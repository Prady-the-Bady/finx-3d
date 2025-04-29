'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <button
        onClick={() => disconnect()}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Disconnect ({address.slice(0, 4)}...{address.slice(-4)})
      </button>
    );

  return (
    <button
      onClick={() => connect({ connector: new InjectedConnector() })}
      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
    >
      Connect Wallet
    </button>
  );
}
