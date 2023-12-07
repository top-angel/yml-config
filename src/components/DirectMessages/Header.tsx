import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import { didToAddress } from "../../context/chat/utils/_utils";
import { toast } from "react-toastify";
import ChatBubble from "public/assets/images/chatbubble.svg";
import ArrowBack from "public/assets/images/arrow.svg";
import ChevronUp from "public/assets/images/chevronup.svg";
import Copy from "public/assets/images/copy.svg";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function Header() {
  const { wallets } = useWallets();

  const wallet: any = wallets.find((w: any) => w.walletClientType === "privy");
  const accountId = wallet?.address;
  const {
    conversations,
    conversationId,
    openConversations,
    activeConversationTitle,
    totalNotifications,
    setActiveConversationTitle,
    getConversationTitle,
    setOpenConversations,
    setConversationId,
  } = useOrbis();

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const { role } = target.dataset;
    if (role) {
      if (role === "back-button") {
        setConversationId(null);
      } else {
        let _address = "";
        const conversation = conversations.find(
          (c) => c.stream_id === conversationId
        );
        const recipients = conversation.recipients.filter(
          (r) => didToAddress(r) !== accountId.toLowerCase()
        );
        _address = didToAddress(recipients[0]);
        navigator.clipboard.writeText(_address);
        toast.info("Address copied to clipboard");
      }
    } else {
      setOpenConversations(!openConversations);
    }
  };

  const setConversationTitle = async (conversationId: string) => {
    if (conversationId.startsWith("new-")) {
      setActiveConversationTitle(conversationId.replace("new-", ""));
    } else {
      const title = await getConversationTitle(conversationId);
      setActiveConversationTitle(title);
    }
  };

  useEffect(() => {
    if (!conversationId) setActiveConversationTitle(null);
    else setConversationTitle(conversationId);
  }, [conversationId]);

  return (
    <div>
      <div className={styles.header} onClick={handleClick}>
        {!conversationId ? (
          <>
            <div>
              <ChatBubble
                role="img"
                aria-label="Chat"
                className={styles.icon}
              />
            </div>
            <span>1:1 Chat Messages</span>
            {totalNotifications > 0 && (
              <span className={styles.notificationCount}>
                {totalNotifications}
              </span>
            )}
          </>
        ) : (
          <>
            {openConversations && (
              <button
                type="button"
                aria-label="button"
                data-role="back-button"
                className={styles.btnBack}
              >
                <ArrowBack
                  role="img"
                  aria-label="arrow"
                  className={styles.backIcon}
                />
              </button>
            )}
            {activeConversationTitle && (
              <>
                <span>{activeConversationTitle}</span>
                <button
                  type="button"
                  data-role="copy-address"
                  title="Copy Address"
                  className={styles.btnCopy}
                >
                  <Copy
                    role="img"
                    aria-label="Copy Address"
                    className={styles.copyIcon}
                  />
                </button>
              </>
            )}
          </>
        )}
        <div className={styles.toggleArrow}>
          <ChevronUp
            role="img"
            aria-label="Toggle"
            className={`${styles.icon} ${
              openConversations ? styles.isFlipped : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
