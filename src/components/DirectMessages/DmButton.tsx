import React, { useEffect, useState } from "react";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function DmButton({
  accountId,
  text = "Start a Private Chat with selected User.",
}: {
  accountId: string;
  text?: string;
}) {
  const { wallets } = useWallets();

  const wallet: any = wallets.find((w: any) => w.walletClientType === "privy");
  const ownAccountId = wallet?.address;
  const {
    checkOrbisConnection,
    getConversationByDid,
    setConversationId,
    setOpenConversations,
    createConversation,
    getDid,
  } = useOrbis();
  const [userDid, setUserDid] = useState<string | undefined>();
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const handleActivation = async () => {
    if (ownAccountId) {
      await checkOrbisConnection({
        address: ownAccountId,
        autoConnect: true,
        lit: true,
      });
    }
  };

  useEffect(() => {
    const getUserDid = async () => {
      const did = await getDid(accountId);
      setUserDid(did);
    };

    if (accountId) {
      getUserDid();
    }
  }, [accountId]);

  if (accountId !== ownAccountId && userDid) {
    async () => {
      if (!ownAccountId) {
        handleActivation();
      } else {
        setIsCreatingConversation(true);
        const conversation = await getConversationByDid(userDid);
        if (conversation) {
          setConversationId(conversation.stream_id);
        } else {
          const newConversationId = await createConversation([userDid]);
          setConversationId(newConversationId);
        }
        setOpenConversations(true);
        setIsCreatingConversation(false);
      }
    };
    return (
      <button
        className="rounded-full bg-green bg-opacity-20 px-2 py-1 text-xs font-normal text-green cursor-pointer"
        disabled={isCreatingConversation}
        onClick={async () => {
          if (!ownAccountId) {
            handleActivation();
          } else {
            setIsCreatingConversation(true);
            const conversation = await getConversationByDid(userDid);
            if (conversation) {
              setConversationId(conversation.stream_id);
            } else {
              const newConversationId = await createConversation([userDid]);
              setConversationId(newConversationId);
            }
            setOpenConversations(true);
            setIsCreatingConversation(false);
          }
        }}
      >
        {isCreatingConversation ? "Loading..." : text}
      </button>
    );
  }
}
