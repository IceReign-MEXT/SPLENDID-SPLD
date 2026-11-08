import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const EXPECTED_SUPPLY = 1_000_000_000n;
export const DECIMALS = 9;
export const TOKEN_NAME = "SPLENDID";
export const TOKEN_SYMBOL = "SPLD";
export const DEVNET_URL = clusterApiUrl("devnet");

export function getConnection() {
  const rpc = process.env.SOLANA_RPC_URL || DEVNET_URL;
  if (rpc !== DEVNET_URL && !/devnet/i.test(rpc)) {
    throw new Error("Safety stop: RPC URL does not identify Solana Devnet.");
  }
  return new Connection(rpc, "confirmed");
}

export function loadDevnetKeypair() {
  const raw = process.env.DEVNET_KEYPAIR;
  if (!raw) throw new Error("DEVNET_KEYPAIR is missing. Copy .env.example to .env and set a Devnet-only keypair.");
  let secret;
  try { secret = JSON.parse(raw); } catch { throw new Error("DEVNET_KEYPAIR must be a JSON array of secret-key bytes."); }
  if (!Array.isArray(secret) || secret.length !== 64 || !secret.every((n) => Number.isInteger(n) && n >= 0 && n <= 255)) {
    throw new Error("DEVNET_KEYPAIR must contain exactly 64 integer bytes.");
  }
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

export function parseMintAddress(value) {
  try { return new PublicKey(value); } catch { throw new Error("SPLD_MINT_ADDRESS is missing or is not a valid Solana public key."); }
}

export function rawSupply() {
  return EXPECTED_SUPPLY * (10n ** BigInt(DECIMALS));
}
