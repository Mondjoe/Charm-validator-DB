Charm-validator-DB/
├── public/
│   └── badge-assets/         # IPFS badge previews
├── src/
│   ├── components/
│   │   ├── WalletLogin.jsx   # Wallet connectors
│   │   ├── BadgeDisplay.jsx  # Validator + contributor badge views
│   │   ├── VaultTracker.jsx  # MUSDT + TRX balance logic
│   │   └── SnapshotExport.jsx# Grant payload builder
│   ├── App.jsx
│   └── index.js
├── metadata/
│   ├── validator.json        # IPFS metadata
│   └── contributors.json     # Badge roles + wallet proofs
├── .gitignore
├── README.md
└── package.json
# Charm-validator-DB
Modular validator dashboard for Charm, anchored across Ethereum, Solana, TRON, TON, and Bitcoin. Includes wallet login, NFT badge display, MUSDT vault tracking, DAO sync, audit trail, and contributor badge minting. Built for grant packaging, ecosystem transparency, and cross-chain identity proof.
