import React, { useState } from "react";

function SnapshotExport({ validator, contributors, currentContributor }) {
  const [exportData, setExportData] = useState(null);

  const buildSnapshot = () => {
    if (!currentContributor) {
      alert("Connect a wallet that matches a contributor before exporting.");
      return;
    }

    const snapshot = {
      snapshot_id: Date.now().toString(), // simple unique ID
      timestamp: new Date().toISOString(),

      validator: {
        id: validator.validator_id,
        name: validator.name,
        networks: validator.networks,
        sovereignty: validator.sovereignty,
        ipfs: validator.ipfs
      },

      contributor: {
        id: currentContributor.id,
        name: currentContributor.name,
        roles: currentContributor.roles,
        wallets: currentContributor.wallets,
        proofs: currentContributor.proofs
      },

      meta: {
        exported_from: "Charm Validator Capsule",
        version: "1.0.0"
      }
    };

    setExportData(snapshot);
  };

  const downloadJSON = () => {
    if (!exportData) return;

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `snapshot_${exportData.snapshot_id}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="snapshot-export">
      <button onClick={buildSnapshot}>Build Snapshot</button>

      {exportData && (
        <div className="snapshot-preview">
          <h4>Snapshot Ready</h4>
          <pre className="snapshot-json">
            {JSON.stringify(exportData, null, 2)}
          </pre>

          <button onClick={downloadJSON}>Download JSON</button>
        </div>
      )}
    </div>
  );
}

export default SnapshotExport;
