import React, { useState } from 'react';
import styles from "./styles";
import Comment from "./Comment";

const App = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        replies: [],
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const addReply = (id, replyText) => {
    const updatedComments = comments.map((cmt) => {
      if (cmt.id === id) {
        return {
          ...cmt,
          replies: [
            ...cmt.replies,
            { id: Date.now(), text: replyText, replies: [] },
          ],
        };
      } else if (cmt.replies.length > 0) {
        return {
          ...cmt,
          replies: addReplyToReplies(cmt.replies, id, replyText),
        };
      }
      return cmt;
    });
    setComments(updatedComments);
  };
  const addReplyToReplies = (replies, id, replyText) => {
    return replies.map((reply) => {
      if (reply.id === id) {
        return {
          ...reply,
          replies: [
            ...reply.replies,
            { id: Date.now(), text: replyText, replies: [] },
          ],
        };
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: addReplyToReplies(reply.replies, id, replyText),
        };
      }
      return reply;
    });
  };

  const renderComments = (comments) => {
    return comments.map((cmt) => (
      <div key={cmt.id} style={{ marginLeft: cmt.replies.length ? 20 : 0 }}>
        <Comment comment={cmt} onReply={addReply} />
        {cmt.replies.length > 0 && <div>{renderComments(cmt.replies)}</div>}
      </div>
    ));
  };
  return (
    <div style={styles.card}>
      <h3>Comment App</h3>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={comment}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCommentSubmit} style={styles.button}>
          Comment
        </button>
      </div>

      <div style={styles.commentsContainer}>{renderComments(comments)}</div>
    </div>
  );
};

// Basic styles for the card and buttons


export default App;
