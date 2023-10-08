import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import styles from './ChatDisplay.module.css';

const ChatDisplay = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const isCurrentUserMessage = message.senderId === currentUser.uid;

  return (
    <div
      className={`${styles['ChatDisplay-container']} ${
        isCurrentUserMessage ? styles['currentUserMessage'] : styles['otherUserMessage']
      }`}
    >
      <div className={styles['ChatMessage']}>{message.text}</div>
    </div>
  );
};

export default ChatDisplay;
