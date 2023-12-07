import React, { useMemo } from "react";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import { IConversationWithAdditionalData } from "../../context/chat/DirectMessages/_types";
import ListItem from "./ListItem";
import ChatBubble from "public/assets/images/chatbubble.svg";
import styles from "./List.module.css";

export default function List() {
  const { conversations, setConversationId } = useOrbis();

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conversation: IConversationWithAdditionalData) =>
        !conversation.empty_message
    );
  }, [conversations]);

  return (
    <div className={styles.conversations}>
      {filteredConversations.length > 0 ? (
        filteredConversations.map(
          (conversation: IConversationWithAdditionalData, index: number) => (
            <ListItem
              key={index}
              conversation={conversation}
              setConversationId={setConversationId}
            />
          )
        )
      ) : (
        <div className={styles.empty}>
          <ChatBubble role="img" aria-label="Chat" className={styles.icon} />
          <p>Please start a conversation!</p>
        </div>
      )}
    </div>
  );
}
