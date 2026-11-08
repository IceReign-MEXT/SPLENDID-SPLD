import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintToChecked,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { getConnection, loadDevnetKeypair, DECIMALS, EXPECTED_SUPPLY, rawSupply } from "./lib.mjs";

try {
  const connection = getConnection();
  const payerAndAuthority = loadDevnetKeypair();

  const genesis = await connection.getGenesisHash();
  if (genesis !== await connection.getGenesisHash()) throw new Error("Devnet identity check failed.");
  const balance = await connection.getBalance(payerAndAuthority.publicKey);
  if (balance < 50_000_000) throw new Error("Insufficient Devnet SOL. Fund this test wallet before proceeding.");

  console.log("Creating SPLENDID (SPLD) on Solana Devnet only.");
  console.log("Supply:", EXPECTED_SUPPLY.toString(), "SPLD");
  console.log("Decimals:", DECIMALS);
  console.log("Freeze authority: none");
  console.log("Mint authority: test wallet retained");
  console.log("Recipient: test wallet", payerAndAuthority.publicKey.toBase58());

  const mint = await createMint(
    connection,
    payerAndAuthority,
    payerAndAuthority.publicKey,
    null,
    DECIMALS,
    undefined,
    { commitment: "confirmed" },
    TOKEN_PROGRAM_ID
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payerAndAuthority,
    mint,
    payerAndAuthority.publicKey,
    false,
    "confirmed",
    undefined,
    TOKEN_PROGRAM_ID
  );

  const signature = await mintToChecked(
    connection,
    payerAndAuthority,
    mint,
    tokenAccount.address,
    payerAndAuthority,
    rawSupply(),
    DECIMALS,
    [],
    { commitment: "confirmed" },
    TOKEN_PROGRAM_ID
  );

  console.log("\nDEVNET TOKEN CREATED");
  console.log("Mint address:", mint.toBase58());
  console.log("Token account:", tokenAccount.address.toBase58());
  console.log("Mint transaction: https://explorer.solana.com/tx/" + signature + "?cluster=devnet");
  console.log("Mint page: https://explorer.solana.com/address/" + mint.toBase58() + "?cluster=devnet");
  console.log("IMPORTANT: Save the mint address. This is a Devnet test token with no monetary value.");
  console.log("Metadata is not yet attached; do not describe this as a finished public token.");
} catch (error) {
  console.error("Devnet mint creation failed:", error.message);
  process.exitCode = 1;
}
