/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList.jsx';
import MessageInput from '../components/MessageInput.jsx';

const MessagesPage= ({ currentUserId, recipientId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (messageContent) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ user_id: recipientId, message: messageContent }),
      });

      const newMessage = await response.json();
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessagesPage;
