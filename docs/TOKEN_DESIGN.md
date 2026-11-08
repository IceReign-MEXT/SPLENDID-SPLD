# SPLD Token Design Record

**Status:** Provisional planning document  
**Network:** Solana  
**Environment:** Devnet first

This document records the current design direction. It does not certify that a token has been created, audited, approved, or launched.

## 1. Identity

- Project: SPLENDID
- Proposed token name: SPLENDID
- Proposed symbol: SPLD
- Intended chain: Solana
- Proposed total supply: 1,000,000,000 SPLD

The name and symbol must be checked for conflicts and potential confusion before any public launch. A ticker is not a unique identifier; the verified mint address will identify any eventual token.

## 2. Supply and decimals

The one-billion token supply is a proposed planning amount only.

- Decimals: **9 (approved design choice for the Devnet prototype)**.
- The supply and decimals must be configured before mint creation.
- The human-readable token amount is represented on-chain using integer base units.

No allocation percentages, vesting schedules, liquidity amounts, sale amounts, or team allocations are approved by this document.

## 3. Token program and metadata

- Token program: **Original Solana SPL Token Program**.
- Metadata approach: **Metaplex Token Metadata**.
- Token-2022 extensions are not planned for the initial prototype.
- Metadata should use durable, content-addressed hosting for its JSON and image assets before any public release.
- Metadata update authority must be documented and controlled; its final public-launch arrangement remains undecided.

The original SPL Token Program is selected for a straightforward initial token with broad ecosystem compatibility. Reconsidering the token program after mint creation would mean creating a different mint; this decision should therefore be reviewed before minting.

## 4. Authorities

The current instruction is to retain mint authority during Devnet testing.

- Devnet mint authority: retain only in a controlled test setup.
- Mainnet mint authority: undecided; no mainnet mint exists or is authorised.
- Freeze authority: **none planned** for the initial design.
- Metadata update authority: retain during development under controlled access; final public-release policy remains undecided.

Authority changes can have important and sometimes irreversible consequences. Do not revoke mint authority until the final supply and all minting operations have been independently checked and the implications have been reviewed. Do not assume that retaining authority is appropriate for a public token.

Use a dedicated Devnet test wallet. Never commit seed phrases, private keys, wallet backups, or signing secrets to this repository or a website. A Devnet mint and its keys must not be reused as a Mainnet launch credential.

## 5. Token purpose

Potential future utility areas include:

- access to clearly described digital features;
- discounts on eligible SPLENDID products or services;
- community participation features;
- transparent, non-financial community recognition.

These are concepts, not currently delivered benefits. A utility must exist, be usable, and be described accurately before it is advertised as available.

## 6. No investment promises

SPLD currently has no promised:

- price or return;
- dividend or share of company profits;
- interest or staking yield;
- guaranteed liquidity or buyback;
- exchange listing;
- redemption value.

Any change to these positions requires separate technical, commercial, and legal review. Do not use speculative claims to attract participants.

## 7. Mainnet go/no-go checklist

A Mainnet decision must not be made until all relevant items are addressed:

- [ ] Token name, symbol, decimals, supply, and metadata reviewed.
- [ ] Token program and any extensions reviewed.
- [ ] Written token purpose and rights approved.
- [ ] Allocation and vesting, if any, fully disclosed.
- [ ] Mint, freeze, and metadata authorities documented.
- [ ] Treasury custody and access controls reviewed.
- [ ] Independent security review appropriate to the design completed.
- [ ] Legal classification and applicable Nigerian and other relevant requirements reviewed by qualified counsel.
- [ ] Public disclosures, risk warnings, and operating plan completed.
- [ ] Costs, ongoing maintenance, and incident response funded.
- [ ] Explicit go/no-go approval recorded.

Until then, development remains on Devnet and no public token sale is planned.
