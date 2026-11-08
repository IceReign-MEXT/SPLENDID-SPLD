# Security Policy

Security is a development requirement, not a marketing claim. This document describes minimum practices for the SPLENDID project.

## Secrets and wallet keys

- Never commit seed phrases, private keys, keystore files, access tokens, API secrets, or passwords.
- Never paste a recovery phrase or private key into an issue, chat, website, or support request.
- Use a dedicated Devnet wallet for experiments; do not reuse a wallet that holds valuable assets.
- Keep signing keys outside the web frontend and repository.
- Use environment variables or a reputable secret manager for server-side secrets.
- Commit only safe example configuration such as `.env.example`, with placeholder values.

## Token authority controls

- Keep Devnet testing separate from any future Mainnet environment.
- Record the mint address and all authority addresses in project documentation after verification.
- Restrict access to authority keys.
- Do not revoke or transfer authorities without a reviewed change plan.
- Do not claim that an authority is renounced, locked, or multisig-controlled unless independently verified.

## Application security

- Request only the wallet permissions required for a feature.
- Explain every transaction before a user signs it.
- Never ask users to share their recovery phrase.
- Use trusted wallet adapters and official network endpoints.
- Validate all server inputs and avoid exposing RPC credentials.
- Keep dependencies updated and review changes before deployment.
- Do not store unnecessary personal information.

## Reporting a vulnerability

Please do not publish exploitable details in a public issue. Open a minimal report requesting a private security contact, or contact the maintainers through a verified project channel once one is published.

Include:
- affected component and version;
- concise reproduction steps;
- potential impact;
- suggested mitigation, if known.

Do not test against wallets, accounts, or systems you do not own or have explicit permission to assess.

## Incident response

If a key or credential may have been exposed:
1. Stop using the affected credential.
2. Revoke or rotate it using the relevant provider's official process.
3. Assess whether funds or user data may be affected.
4. Preserve relevant logs without publishing secrets.
5. Notify affected users when appropriate.
6. Document the incident and corrective actions.

## Scope

This policy is an initial baseline and is not an audit, certification, or guarantee that the software is secure.
