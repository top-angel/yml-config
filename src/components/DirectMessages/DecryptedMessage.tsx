import React, { useState, useEffect } from "react";
import { useOrbis } from "../../context/chat/DirectMessages/DirectMessages";
import Refresh from "public/assets/images/refresh.svg";
import styles from "./DecryptedMessage.module.css";
import { IOrbisMessageContent } from "../../context/chat/DirectMessages/_types";

export default function DecryptedMessage({
  content,
  position = "right",
}: {
  content: IOrbisMessageContent & { decryptedMessage?: string };
  position: "left" | "right";
}) {
  const { orbis } = useOrbis();
  const [loading, setLoading] = useState(true);
  const [decrypted, setDecrypted] = useState(null);
  const [encryptionError, setEncryptionError] = useState<boolean>(false);

  const decryptMessage = async () => {
    setLoading(true);
    setEncryptionError(false);

    try {
      if (content?.decryptedMessage) {
        setDecrypted(content?.decryptedMessage);
      } else {
        const res = await orbis.decryptMessage({
          conversation_id: content?.conversation_id,
          encryptedMessage: content?.encryptedMessage,
        });
        if (res.status === 200) {
          setEncryptionError(false);
          setDecrypted(res.result);
        } else {
          setEncryptionError(true);
          setDecrypted("Decryption error - please try later");
        }
      }
    } catch (error) {
      setEncryptionError(true);
      setDecrypted("Decryption error - please try later");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (content && orbis) decryptMessage();
  }, [content, orbis]);

  if (loading) {
    return <span className={styles.decrypting}>---</span>;
  }

  return (
    <div style={{ position: "relative" }}>
      {!loading ? decrypted : "---"}
      {encryptionError && (
        <button
          type="button"
          className={`${styles.refresh} ${styles[position]}`}
          onClick={decryptMessage}
          title="Refresh"
        >
          <Refresh
            role="img"
            aria-label="Refresh"
            className={styles.refreshIcon}
          />
        </button>
      )}
    </div>
  );
}
