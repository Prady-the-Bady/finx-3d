// lib/crypto.ts

export async function sendCrypto(to: string, amount: string) {
  if (!(window as any).ethereum) throw new Error("No wallet found");

  const provider = new (await import("@wagmi/core")).createProvider({
    chains: [],
    provider() {
      return (window as any).ethereum;
    },
  });

  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to,
    value: BigInt(Number(amount) * 1e18), // Convert to WEI
  });

  await tx.wait();
  return tx.hash;
}
