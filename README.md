Charm-validator-DB/
│
├── public/
│   └── badge-assets/          # IPFS badge previews, static images, icons
│
├── src/
│   ├── components/
│   │   ├── WalletLogin.jsx    # Wallet connectors (EVM, Solana, TRON, TON)
│   │   ├── BadgeDisplay.jsx   # NFT badge rendering + contributor roles
│   │   ├── VaultTracker.jsx   # MUSDT, TRX, and multi-chain vault balances
│   │   └── SnapshotExport.jsx # Grant payload + snapshot export builder
│   │
│   ├── App.jsx                # Main dashboard layout + routing
│   └── index.js               # React entry point
│
├── metadata/
│   ├── validator.json         # Validator identity metadata (IPFS)
│   └── contributors.json      # Badge roles, wallet proofs, contributor map
│
├── .gitignore
├── README.md                  # Capsule documentation
└── package.json               # Dependencies + build scripts
