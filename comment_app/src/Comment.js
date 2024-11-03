import React, { useState } from "react";
import styles from "./styles";

const Comment = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  return (
    <div style={styles.commentCard}>
      <p>{comment.text}</p>
      <div style={styles.buttonGroup}>
        <button
          style={styles.actionButton}
          onClick={() => setIsReplying(!isReplying)}
        >
          Reply
        </button>
        <button style={styles.actionButton}>Edit</button>
        <button style={styles.actionButton}>Delete</button>
      </div>
      {isReplying && (
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={replyText}
            placeholder="Write a reply..."
            onChange={(e) => setReplyText(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleReply} style={styles.button}>
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
