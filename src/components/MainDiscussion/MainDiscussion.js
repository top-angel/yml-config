import React, { useState, useEffect } from "react";
import { Orbis, Chat, OrbisProvider } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { providerToBrowserProvider } from "./genericBrowserWallet.js"
import DmButton from "../DirectMessages/DmButton";
import DirectMessages from "../DirectMessages"


const MainDiscussion = ({accountId}) => {
  const { wallets } = useWallets();
  const [connectedToOrbis, setConnectedToOrbis] = useState(false); 

  const orbis = new Orbis();

  useEffect(() => {
    const connectToOrbis = async () => {
      const wallet = wallets.find(w => w.walletClientType === 'privy');
      const privyProvider = await wallet?.getEthereumProvider();
      const orbisProvider = providerToBrowserProvider(privyProvider);
      const result = await orbis.connect_v2({ provider: orbisProvider, chain: "ethereum" });
      setConnectedToOrbis(true); 
    };

    connectToOrbis(); 
  }, [wallets]);

  return (
    <div>
      <OrbisProvider defaultOrbis={orbis}>
        {connectedToOrbis ? (
          <div>
            <DmButton accountId={accountId} />
            <DirectMessages />
          </div>
        ): (<div className="text-xs font-normal text-green">Wait a moment please...</div>)}
      </OrbisProvider>
    </div>
  );
};

export default MainDiscussion;
