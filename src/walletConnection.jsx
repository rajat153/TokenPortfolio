import { ConnectButton } from "@rainbow-me/rainbowkit";

const walletConnection = () => {

  return (
    <div>
      <ConnectButton accountStatus="avatar" chainStatus="icon"/>
    </div>
  );
};

export default walletConnection;