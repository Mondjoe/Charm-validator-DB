import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function VaultTracker({ currentWallet, validator }) {
  const [balances, setBalances] = useState({
    native: null,
    musdt: null
  });

  const [loading, setLoading] = useState(false);

  // Fetch balances when wallet changes
  useEffect(() => {
    if (!currentWallet) {
      setBalances({ native: null, musdt: null });
      return;
    }

    fetchBalances();
  }, [currentWallet]);

  const fetchBalances = async () => {
    setLoading(true);

    try {
      const { address, network } = currentWallet;

      if (network === "ethereum") {
        await fetchEvmBalances(address);
      }

      if (network === "tron") {
        await fetchTronBalances(address);
      }

      if (network === "solana") {
        await fetchSolanaBalances(address);
      }

      if (network === "ton") {
        await fetchTonBalances(address);
      }
    } catch (err) {
      console.error("VaultTracker error:", err);
    }

    setLoading(false);
  };

  // -----------------------------
  // EVM (ETH, Base, BNB, etc.)
  // -----------------------------
  const fetchEvmBalances = async (address) => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);

    setBalances({
      native: ethers.formatEther(balance),
      musdt: null
    });
  };

  // -----------------------------
  // TRON (TRX + MUSDT)
  // -----------------------------
  const fetchTronBalances = async (address) => {
    if (!window.tronWeb) return;

    const tronWeb = window.tronWeb;

    const trx = await tronWeb.trx.getBalance(address);
    let musdt = null;

    try {
      const musdtContract = await tronWeb.contract().at(
        validator?.networks?.tron?.musdt_contract || ""
      );
      musdt = await musdtContract.balanceOf(address).call();
      musdt = Number(musdt) / 1_000_000;
    } catch (err) {
      musdt = null;
    }

    setBalances({
      native: trx / 1_000_000,
      musdt
    });
  };

  // -----------------------------
  // Solana (SOL)
  // -----------------------------
  const fetchSolanaBalances = async (address) => {
    try {
      const connection = new window.solanaWeb3.Connection(
        window.solanaWeb3.clusterApiUrl("mainnet-beta")
      );
      const publicKey = new window.solanaWeb3.PublicKey(address);
      const lamports = await connection.getBalance(publicKey);

      setBalances({
        native: lamports / 1_000_000_000,
        musdt: null
      });
    } catch (err) {
      console.error("Solana balance error:", err);
    }
  };

  // -----------------------------
  // TON (TON)
  // -----------------------------
  const fetchTonBalances = async (address) => {
    try {
      const res = await fetch(
        `https://tonapi.io/v2/accounts/${address}`
      );
      const data = await res.json();

      setBalances({
        native: data.balance / 1_000_000_000,
        musdt: null
      });
    } catch (err) {
      console.error("TON balance error:", err);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="vault-tracker">
      {!currentWallet && (
        <p>No wallet connected. Connect a wallet to view balances.</p>
      )}

      {currentWallet && (
        <div>
          <p>
            <strong>Network:</strong> {currentWallet.network}
          </p>
          <p>
            <strong>Address:</strong> {currentWallet.address}
          </p>

          {loading && <p>Loading balances…</p>}

          {!loading && (
            <div className="vault-balances">
              <p>
                <strong>Native:</strong>{" "}
                {balances.native !== null ? balances.native : "—"}
              </p>

              <p>
                <strong>MUSDT:</strong>{" "}
                {balances.musdt !== null ? balances.musdt : "—"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VaultTracker;
