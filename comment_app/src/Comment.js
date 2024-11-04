import React, { useState } from "react";
import styles from "./styles";

const Comment = ({ comment, onReply ,onEdit}) => {
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

      <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>

      {isReplying && (
        <div>
          <input
            type="text"
            value={replyText}
            placeholder="Write a reply..."
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
