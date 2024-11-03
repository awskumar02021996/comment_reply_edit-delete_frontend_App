import React, { useState } from 'react';
import styles from "./styles";

const App = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div style={styles.card}>
      <h3>Comment & Reply App</h3>
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

      <div style={styles.commentsContainer}>
        {comments.map((cmt, index) => (
          <div key={index} style={styles.commentCard}>
            <p>{cmt}</p>
            <div style={styles.buttonGroup}>
              <button style={styles.actionButton}>Reply</button>
              <button style={styles.actionButton}>Edit</button>
              <button style={styles.actionButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Basic styles for the card and buttons


export default App;
