import { getConnection, loadDevnetKeypair, EXPECTED_SUPPLY, DECIMALS } from "./lib.mjs";

try {
  const connection = getConnection();
  const wallet = loadDevnetKeypair();
  const version = await connection.getVersion();
  const balance = await connection.getBalance(wallet.publicKey);
  const genesis = await connection.getGenesisHash();

  console.log("SPLENDID Devnet preflight");
  console.log("------------------------");
  console.log("Cluster: Solana Devnet");
  console.log("Genesis hash:", genesis);
  console.log("RPC version:", version["solana-core"]);
  console.log("Wallet:", wallet.publicKey.toBase58());
  console.log("Devnet SOL:", (balance / 1_000_000_000).toFixed(6));
  console.log("Planned token supply:", EXPECTED_SUPPLY.toString(), "SPLD");
  console.log("Decimals:", DECIMALS);
  console.log("Raw base units:", (EXPECTED_SUPPLY * 10n ** BigInt(DECIMALS)).toString());
  if (balance < 50_000_000) {
    console.warn("WARNING: wallet has less than 0.05 Devnet SOL; request a Devnet airdrop before testing.");
  }
  console.log("Preflight completed. No transaction was sent.");
} catch (error) {
  console.error("Preflight failed:", error.message);
  process.exitCode = 1;
}
