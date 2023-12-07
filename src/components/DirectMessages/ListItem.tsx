import React, { useState, useEffect } from "react";
import { useCancelToken } from "../../context/chat/utils/useCancelToken";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import { IConversationWithAdditionalData } from "../../context/chat/DirectMessages/_types";
import { didToAddress } from "../../context/chat/utils/_utils";
import Time from "../../context/chat/utils/Time";
import styles from "./ListItem.module.css";
import Image from "next/image";

export default function ConversationItem({
  conversation,
  setConversationId,
}: {
  conversation: IConversationWithAdditionalData;
  setConversationId: (value: string) => void;
}) {
  const { account, getConversationTitle } = useOrbis();

  const newCancelToken = useCancelToken();

  const [name, setName] = useState<string>(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const did = conversation.recipients.find((o) => o !== account.did);

      const _address = didToAddress(did);
      setAddress(_address);

      const _name = await getConversationTitle(conversation?.stream_id);
      setName(_name);
    };

    if (conversation && account) {
      getProfile();
    }
  }, [conversation, account, newCancelToken, getConversationTitle]);

  return (
    <div
      className={styles.conversation}
      onClick={() => setConversationId(conversation.stream_id)}
    >
      <div className={styles.accountAvatarSet}>
        <Image
          src="/assets/images/mo-garage.png"
          alt="image"
          width={24}
          height={24}
          unoptimized
          className="rounded-full outline outline-2 outline-purple m-2"
        />
        {conversation.notifications_count > 0 && (
          <div className={styles.notificationCount}>
            {conversation.notifications_count}
          </div>
        )}
      </div>
      <div className={styles.accountInfo}>
        <div className={styles.accountName}>{name}</div>
        <span className={styles.lastMessageDate}>
          <Time
            date={conversation.last_message_timestamp.toString()}
            isUnix={true}
            relative={false}
            displayFormat="Pp"
          />
        </span>
      </div>
    </div>
  );
}
