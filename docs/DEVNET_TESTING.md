# SPLD Devnet Build and Test Guide

**Environment:** Solana Devnet only  
**Token:** SPLENDID (SPLD)  
**Planned supply:** 1,000,000,000  
**Decimals:** 9  
**Token program:** Original SPL Token Program  
**Mint authority:** Test wallet retained  
**Freeze authority:** None

## Safety rules

- Never paste a seed phrase or private key into a chat, GitHub issue, source file, website, or screenshot.
- Never commit `.env`. The repository ignores it.
- Use a newly created Devnet-only wallet, not a wallet holding real assets.
- These scripts are hard-wired to reject RPC URLs that do not identify Devnet.
- Devnet tokens have no monetary value.
- The scripts create a mint and mint the full proposed test supply to the test wallet. This is a blockchain transaction, so run it only when you intentionally want to create the test mint.
- No Mainnet deployment, sale, liquidity pool, or exchange listing is included.

## Requirements

- Node.js 20 or newer
- npm
- A dedicated Devnet wallet with a small amount of Devnet SOL for transaction fees and rent

## Setup

1. Clone this repository on a trusted computer.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put a Devnet-only keypair JSON byte array in `DEVNET_KEYPAIR`.
5. Keep `.env` private. Do not upload it or share it.

## Step 1 — Preflight (read-only)

Run:

```bash
npm run preflight
```

This checks the Devnet RPC, wallet address, balance, token settings and raw supply calculation. It sends no transaction.

## Step 2 — Create the Devnet mint (writes to Devnet)

Only after reviewing the preflight output, run:

```bash
npm run create:devnet
```

This creates an original SPL mint with 9 decimals, no freeze authority, and the test wallet as mint authority. It creates the wallet's associated token account and mints 1,000,000,000 SPLD to that wallet.

Save the printed mint address and transaction link. Do not lose the mint address.

## Step 3 — Verify the mint

Add the mint address to `.env`:

```env
SPLD_MINT_ADDRESS=PASTE_THE_DEVNET_MINT_ADDRESS_HERE
```

Then run:

```bash
npm run verify:devnet
```

All six checks must pass. If any check fails, stop and investigate; do not proceed to a public announcement or Mainnet.

## Metadata is a separate stage

The token metadata account and durable logo/JSON URI are not created by these initial scripts. The SPLENDID logo and metadata content must be approved and stored durably before attaching Metaplex metadata. Do not invent a temporary URI or claim metadata is live.

## Current scope

These scripts are a first Devnet engineering stage, not an audit or production release. The next stage is metadata preparation and attachment, followed by repeatable tests and a security review. Mainnet remains out of scope.
