import React, { useRef } from "react";
import styles from "./Postbox.module.css";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import { accountTruncate } from "../../context/chat/utils/accountTruncate";
import { didToAddress } from "../../context/chat/utils/_utils";
import {
  IOrbisMessage,
  IOrbisMessageContent,
} from "../../context/chat/DirectMessages/_types";
import Image from "next/image";

export default function Postbox({
  replyTo = null,
  cancelReplyTo,
  callback,
}: {
  replyTo?: IOrbisMessage;
  cancelReplyTo?: () => void;
  callback: (value: IOrbisMessage) => void;
}) {
  const postBoxArea = useRef(null);
  const {
    orbis,
    account,
    conversationId,
    updateConversationEmptyMessageStatus,
  } = useOrbis();

  const share = async () => {
    if (!account || postBoxArea.current.innerText.trim() === "") return false;

    const body = postBoxArea.current.innerText.trim();
    postBoxArea.current.innerText = "";

    const content: IOrbisMessageContent & { decryptedMessage?: string } = {
      encryptedMessage: null,
      decryptedMessage: body,
      master: replyTo ? replyTo.master || replyTo.stream_id : undefined,
      reply_to: replyTo ? replyTo.stream_id : undefined,
    };

    const timestamp = Math.floor(Date.now() / 1000);

    const _callbackContent: IOrbisMessage = {
      conversation_id: conversationId,
      content,
      creator: account.did,
      creator_details: {
        did: account.did,
        profile: account.details?.profile,
        metadata: account.details?.metadata,
      },
      master: replyTo ? replyTo.master || replyTo.stream_id : null,
      reply_to: replyTo ? replyTo.stream_id : null,
      reply_to_creator_details: replyTo ? replyTo.creator_details : null,
      reply_to_details: replyTo ? replyTo.content : null,
      stream_id: "new_post--" + timestamp,
      timestamp,
    };

    if (callback) callback(_callbackContent);

    const res = await orbis.sendMessage({
      conversation_id: conversationId,
      body,
    });

    if (res.status === 200) {
      _callbackContent.stream_id = res.doc;
      if (callback) callback(_callbackContent);
      updateConversationEmptyMessageStatus(conversationId, false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.key) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      share();
    }
  };

  return (
    <div className={styles.postbox}>
      {replyTo && (
        <div className={styles.replyto}>
          <div className={styles.replytoDetails}>
            Replying to{" "}
            <strong>
              {replyTo?.creator_details?.metadata?.ensName ||
                accountTruncate(didToAddress(replyTo?.creator_details?.did))}
            </strong>
          </div>
          <button className={styles.replytoCancel} onClick={cancelReplyTo}>
            &times;
          </button>
        </div>
      )}
      <div className={styles.postboxInput}>
        <div
          id="postbox-area"
          ref={postBoxArea}
          className={styles.editable}
          contentEditable={true}
          data-placeholder="Type your message here..."
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className={styles.sendButton}
          onClick={share}
          disabled={!conversationId}
        >
          <Image
            src="/assets/images/message-sender.svg"
            alt="image"
            width={24}
            height={24}
            unoptimized
          />
        </button>
      </div>
    </div>
  );
}
