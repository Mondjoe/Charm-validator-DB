import React, { useEffect, useState } from "react";

import WalletLogin from "./components/WalletLogin";
import BadgeDisplay from "./components/BadgeDisplay";
import VaultTracker from "./components/VaultTracker";
import SnapshotExport from "./components/SnapshotExport";

import validatorMeta from "../metadata/validator.json";
import contributorsMeta from "../metadata/contributors.json";

function App() {
  const [currentWallet, setCurrentWallet] = useState(null);
  const [currentContributor, setCurrentContributor] = useState(null);

  // When wallet changes, try to map it to a contributor
  useEffect(() => {
    if (!currentWallet) {
      setCurrentContributor(null);
      return;
    }

    const { address, network } = currentWallet;

    const match = contributorsMeta.contributors.find((c) => {
      const wallets = c.wallets || {};
      const normalizedNetwork = (network || "").toLowerCase();
      const candidate = wallets[normalizedNetwork];
      return candidate && candidate.toLowerCase() === address.toLowerCase();
    });

    setCurrentContributor(match || null);
  }, [currentWallet]);

  return (
    <div className="app-root">
      {/* Header / Identity */}
      <header className="app-header">
        <div>
          <h1>{validatorMeta.name}</h1>
          <p>{validatorMeta.description}</p>
        </div>

        <div className="app-header-right">
          <div className="sovereignty-pill">
            {validatorMeta.sovereignty?.visibility} ·{" "}
            {validatorMeta.sovereignty?.receivability} ·{" "}
            {validatorMeta.sovereignty?.authority} ·{" "}
            {validatorMeta.sovereignty?.status}
          </div>
          <small className="last-updated">
            Last updated: {validatorMeta.last_updated}
          </small>
        </div>
      </header>

      {/* Main layout */}
      <main className="app-main">
        {/* Left column: wallet + badges */}
        <section className="app-column">
          <div className="card">
            <h2>Wallet Login</h2>
            <WalletLogin onWalletChange={setCurrentWallet} />
          </div>

          <div className="card">
            <h2>Contributor Badges</h2>
            <BadgeDisplay
              validator={validatorMeta}
              contributors={contributorsMeta.contributors}
              currentContributor={currentContributor}
            />
          </div>
        </section>

        {/* Right column: vault + export */}
        <section className="app-column">
          <div className="card">
            <h2>Vault Tracker</h2>
            <VaultTracker
              currentWallet={currentWallet}
              validator={validatorMeta}
            />
          </div>

          <div className="card">
            <h2>Snapshot Export</h2>
            <SnapshotExport
              validator={validatorMeta}
              contributors={contributorsMeta.contributors}
              currentContributor={currentContributor}
            />
          </div>
        </section>
      </main>

      {/* Footer / Links */}
      <footer className="app-footer">
        <span>Charm Capsule · Validator Sovereignty Dashboard</span>
        <span>
          <a href={validatorMeta.links?.dashboard} target="_blank" rel="noreferrer">
            Dashboard
          </a>{" "}
          ·{" "}
          <a href={validatorMeta.links?.viewer} target="_blank" rel="noreferrer">
            Viewer
          </a>{" "}
          ·{" "}
          <a href={validatorMeta.links?.badges} target="_blank" rel="noreferrer">
            Badges
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
