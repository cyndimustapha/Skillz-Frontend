/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const MessageItem = ({ message, isSender }) => {
  return (
    <div className={`message ${isSender ? 'sender' : 'receiver'} mb-3`}>
      <div className="message-content p-2 rounded">
        {message.content}
        <div className="message-time text-muted small">
          {new Date(message.sent_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
