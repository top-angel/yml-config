import React from "react";
import styles from "./index.module.css";
import Conversation from "./Conversation";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import Header from "./Header";
import List from "./List";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const BodyContent = () => {
  const { account, conversationId, checkOrbisConnection } = useOrbis();
  const { wallets } = useWallets();

  const wallet: any = wallets.find((w: any) => w.walletClientType === "privy");
  const accountId = wallet?.address;

  const handleActivation = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (accountId) {
      await checkOrbisConnection({
        address: accountId,
        autoConnect: true,
        lit: true,
      });
    }
  };

  const message = () => {
    return (
      <>
        <p className="font-primary text-sm text-darkgray font-normal">
          A new decentralized, encrypted private messaging is here!
        </p>
      </>
    );
  };

  if (!accountId) {
    return (
      <div className="font-primary text-sm text-darkgray font-normal">
        <div className={styles.walletWrapper}>
          <div>
            <p>Please click Connect to start messaging</p>
            {message()}
            <button
              onClick={(e) => handleActivation(e)}
              className="cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="font-primary text-sm text-darkgray font-normal">
        <div className={styles.walletWrapper}>
          <div>
            <h5>Please click Connect to start messaging</h5>
            {message()}
            <button
              onClick={() =>
                checkOrbisConnection({
                  address: accountId,
                  autoConnect: true,
                  lit: true,
                })
              }
              className="font-primary text-sm text-darkgray font-normal cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-2/5 border-r border-t border-bordergray p-5">
        <List />
      </div>
      <div className="w-3/5 relative border-t border-bordergray p-5">
        {conversationId && <Conversation />}
      </div>
    </div>
  );
};

export default function DirectMessages() {
  const { openConversations } = useOrbis();

  return (
    <div className="font-primary text-sm text-darkgray font-normal">
      <div
        className={`${styles.wrapper} ${!openConversations && styles.isClosed}`}
      >
        <div className={styles.floating}>
          <div className={styles.headerWrapper}>
            <Header />
          </div>
          <div className={styles.bodyWrapper}>
            <BodyContent />
          </div>
        </div>
      </div>
    </div>
  );
}
