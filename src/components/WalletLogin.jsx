import React from "react";
import { ethers } from "ethers";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { TonConnect } from "@tonconnect/sdk";

function WalletLogin({ onWalletChange }) {
  const connectEVM = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      onWalletChange({
        address,
        network: "ethereum"
      });
    } catch (err) {
      console.error("EVM wallet error:", err);
    }
  };

  const connectSolana = async () => {
    try {
      const solana = window.solana;
      if (!solana || !solana.isPhantom) {
        alert("Phantom wallet not detected");
        return;
      }

      const resp = await solana.connect();
      onWalletChange({
        address: resp.publicKey.toString(),
        network: "solana"
      });
    } catch (err) {
      console.error("Solana wallet error:", err);
    }
  };

  const connectTron = async () => {
    try {
      if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
        alert("TronLink not detected");
        return;
      }

      const address = window.tronWeb.defaultAddress.base58;

      onWalletChange({
        address,
        network: "tron"
      });
    } catch (err) {
      console.error("TRON wallet error:", err);
    }
  };

  const connectTON = async () => {
    try {
      const connector = new TonConnect();
      const wallet = await connector.connectWallet();

      onWalletChange({
        address: wallet.account.address,
        network: "ton"
      });
    } catch (err) {
      console.error("TON wallet error:", err);
    }
  };

  return (
    <div className="wallet-login">
      <button onClick={connectEVM}>Connect Ethereum</button>
      <button onClick={connectSolana}>Connect Solana</button>
      <button onClick={connectTron}>Connect TRON</button>
      <button onClick={connectTON}>Connect TON</button>
    </div>
  );
}

export default WalletLogin;
