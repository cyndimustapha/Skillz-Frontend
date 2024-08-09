/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import Sidebar from "../components/Sidebar";
import { useMessages } from '../components/MessagesContext';
import './MessagesPage.css';

const MessagesPage = () => {
  const {
    people,
    setPeople,
    selectedPerson,
    setSelectedPerson,
    newMessage,
    setNewMessage,
    messages,
    setMessages,
  } = useMessages();
  const chatMessagesRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/messages", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMessages();
  }, [setMessages]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/users", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPeople(data);
        } else {
          console.error('Failed to fetch people');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPeople();
  }, [setPeople]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedPerson) {
      const token = localStorage.getItem("token");
      const MESSAGES_API = "http://127.0.0.1:5000/messages";
      const response = await fetch(MESSAGES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: selectedPerson.id,
          message: newMessage,
        }),
      });
      setNewMessage("");
      if (response.ok) {
        alert("Message sent successfully!");
        const updatedMessages = await response.json();
        setMessages(updatedMessages);
      } else {
        alert("Failed to send message.");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="people-list">
          {people.map((person) => (
            <div
              key={person.id}
              className="person"
              onClick={() => setSelectedPerson(person)}
            >
              {person.username}
            </div>
          ))}
        </div>
        <div className="chat-area">
          {selectedPerson ? (
            <>
              <div className="chat-header">
                Chat with {selectedPerson.username}
              </div>
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages
                  .filter(
                    (msg) =>
                      (msg.sender.email === currentUser.email &&
                        msg.recipient.email === selectedPerson.email) ||
                      (msg.sender.email === selectedPerson.email &&
                        msg.recipient.email === currentUser.email)
                  )
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.sender.email === currentUser.email
                          ? "sent"
                          : "received"
                      }`}
                    >
                      <span className="text">{msg.message}</span>
                      <p className="message-time">{msg.time}</p>
                    </div>
                  ))}
              </div>
              <div className="chat-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="chat-header">Select a person to chat with</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
