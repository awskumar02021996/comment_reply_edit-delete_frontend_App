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

  const editComment = (id, newText) => {
    const updatedComments = comments.map((cmt) => {
      if (cmt.id === id) {
        return { ...cmt, text: newText };
      } else if (cmt.replies.length > 0) {
        return {
          ...cmt,
          replies: editCommentInReplies(cmt.replies, id, newText),
        };
      }
      return cmt;
    });
    setComments(updatedComments);
  };

  const editCommentInReplies = (replies, id, newText) => {
    return replies.map((reply) => {
      if (reply.id === id) {
        return { ...reply, text: newText };
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: editCommentInReplies(reply.replies, id, newText),
        };
      }
      return reply;
    });
  };
  const deleteComment = (id) => {
    const updatedComments = comments
      .filter((cmt) => cmt.id !== id)
      .map((cmt) => ({
        ...cmt,
        replies: deleteCommentFromReplies(cmt.replies, id),
      }));
    setComments(updatedComments);
  };

  const deleteCommentFromReplies = (replies, id) => {
    return replies
      .filter((reply) => reply.id !== id)
      .map((reply) => ({
        ...reply,
        replies: deleteCommentFromReplies(reply.replies, id),
      }));
  };
  const renderComments = (comments) => {
    return comments.map((cmt) => (
      <div key={cmt.id} style={{ marginLeft: cmt.replies.length ? 20 : 0 }}>
        <Comment comment={cmt} onReply={addReply} onEdit={editComment} onDelete={deleteComment}/>
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


export default App;
