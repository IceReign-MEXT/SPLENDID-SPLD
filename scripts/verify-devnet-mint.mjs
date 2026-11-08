import { getMint, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getConnection, loadDevnetKeypair, parseMintAddress, DECIMALS, EXPECTED_SUPPLY, rawSupply } from "./lib.mjs";

try {
  const connection = getConnection();
  const owner = loadDevnetKeypair().publicKey;
  const mintAddress = parseMintAddress(process.env.SPLD_MINT_ADDRESS);
  const mint = await getMint(connection, mintAddress, "confirmed", TOKEN_PROGRAM_ID);

  const ata = await getAssociatedTokenAddress(mintAddress, owner, false, TOKEN_PROGRAM_ID);
  const tokenAccount = await getAccount(connection, ata, "confirmed", TOKEN_PROGRAM_ID);

  const checks = [
    ["Decimals equal 9", mint.decimals === DECIMALS],
    ["Mint authority retained by test wallet", mint.mintAuthority?.equals(owner) === true],
    ["Freeze authority absent", mint.freezeAuthority === null],
    ["Supply equals planned 1,000,000,000 SPLD", mint.supply === rawSupply()],
    ["Wallet token account belongs to expected mint", tokenAccount.mint.equals(mintAddress)],
    ["Wallet token balance equals planned supply", tokenAccount.amount === rawSupply()]
  ];

  console.log("SPLENDID Devnet verification");
  console.log("Mint:", mintAddress.toBase58());
  for (const [label, ok] of checks) console.log((ok ? "PASS" : "FAIL") + " - " + label);
  console.log("Supply (display units):", (Number(mint.supply) / 10 ** DECIMALS).toLocaleString("en-US"));
  console.log("Explorer:", "https://explorer.solana.com/address/" + mintAddress.toBase58() + "?cluster=devnet");

  if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
} catch (error) {
  console.error("Verification failed:", error.message);
  process.exitCode = 1;
}
