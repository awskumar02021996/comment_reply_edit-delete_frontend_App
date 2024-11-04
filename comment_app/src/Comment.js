import React, { useState } from "react";
import styles from "./styles";

const Comment = ({ comment, onReply ,onEdit,onDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };
  const handleEditSubmit = () => {
    onEdit(comment.id, editText);
    setIsEditing(false);
  };
  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEditSubmit}>Save</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}

      <button onClick={() => setIsReplying(!isReplying)} style={styles.button}>Reply</button>
      <button onClick={() => setIsEditing(true)} style={styles.button}>Edit</button>
      <button onClick={handleDelete} style={styles.button}>Delete</button>


      {isReplying && (
        <div>
          <input
            type="text"
            value={replyText}
            placeholder="Write a reply..."
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply} style={styles.button}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
