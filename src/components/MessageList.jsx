/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isSender={msg.sender_id === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
