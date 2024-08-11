/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useMessages } from "../components/MessagesContext";

const socket = io("http://localhost:5173");

const MessagesPage = () => {
  const { messages, setMessages, people, setPeople, selectedPerson, setSelectedPerson, newMessage, setNewMessage } = useMessages();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Retrieve and set conversations
    fetch('http://127.0.0.1:5000/users/conversations', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setPeople(data);
      })
      .catch(error => {
        console.error('Error fetching people:', error);
      });

    // Set up socket.io connections
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (username && message && selectedPerson) {
      const fullMessage = { content: message, sender: username, receiver: selectedPerson.id };
      socket.emit('message', fullMessage);
      setMessages((prevMessages) => [...prevMessages, fullMessage]);
      setMessage('');
    } else {
      alert("Please enter both username and message.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back one step in history
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Sidebar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 border-right">
            <button
              onClick={handleBackClick}
              className="btn btn-primary mb-3"
            >
              Back
            </button>
            <div className="list-group">
              {people.map((person) => (
                <button
                  key={person.id}
                  className={`list-group-item list-group-item-action ${selectedPerson && selectedPerson.id === person.id ? 'active' : ''}`}
                  onClick={() => setSelectedPerson(person)}
                >
                  {person.username}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-9">
            {selectedPerson ? (
              <>
                <div className="bg-primary text-white p-3 mb-3 rounded">
                  Chat with {selectedPerson.username}
                </div>
                <div className="chat-messages bg-light p-3 rounded mb-3" ref={chatMessagesRef} style={{ height: '400px', overflowY: 'scroll' }}>
                  {messages.filter(msg => msg.receiver_id === selectedPerson.id || msg.sender_id === selectedPerson.id).map((msg, index) => (
                    <div key={index} className="mb-2">
                      <span className={`d-block p-2 rounded ${msg.sender_id === username ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                        {msg.content}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    onClick={sendMessage}
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-primary text-white p-3 rounded">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
