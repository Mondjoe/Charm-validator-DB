import React from "react";
import VaultTracker from "../components/VaultTracker";
import validator from "../../metadata/validator.json";

function VaultPage() {
  return (
    <div>
      <h1>Vault Tracker</h1>
      <VaultTracker currentWallet={null} validator={validator} />
    </div>
  );
}

export default VaultPage;
