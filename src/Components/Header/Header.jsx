import React from "react";
import Frame from "../../assets/Frame.png";
import "./Header.css";
import wallet from "../../assets/wallet.png";
import WalletConnection from "../../walletConnection";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <header className="header">
      <div className="logo-section">
        <img src={Frame} alt="Logo" />
        <span>Token PortFolio</span>
      </div>
      {!isConnected && (
        <button onClick={openConnectModal} className="header_btn">
          <img src={wallet} />
          Connect Wallet
        </button>
      )}
      {isConnected && <WalletConnection />}
    </header>
  );
};

export default Header;
