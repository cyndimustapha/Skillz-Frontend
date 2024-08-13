/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useMessages } from "../components/MessagesContext";

const socket = io("http://localhost:5173");

const MessagesPage = () => {
  const { messages, setMessages, people, setPeople, selectedPerson, setSelectedPerson } = useMessages();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const chatMessagesRef = useRef(null);
  const currentUser = 1; // Replace with the actual logged-in user's ID

  // Fetch conversations and handle socket events
  useEffect(() => {
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
  }, [setPeople, setMessages]);

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (selectedPerson) {
      fetch(`http://127.0.0.1:5000/messages?receiver_id=${selectedPerson.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          setMessages(data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedPerson, setMessages]);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() && selectedPerson) {
      const newMessage = {
        content: message,
        sender_id: currentUser, // Replace with dynamic current user ID
        receiver_id: selectedPerson.id,
        timestamp: new Date(),
      };

      socket.emit("sendMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');

      // Optionally, persist the message to the backend
      fetch('http://127.0.0.1:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          receiver_id: selectedPerson.id,
          message: message
        }),
      }).catch(error => {
        console.error('Error sending message:', error);
      });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} flex`}>
        {/* Conversations List */}
        <div className="w-64 bg-gray-100 border-r border-gray-300">
          <div className="p-4 bg-[#183d3d] text-white">
            Conversations
          </div>
          <div className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
            {people.map(person => (
              <div
                key={person.id}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedPerson?.id === person.id ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedPerson(person)}
              >
                {person.first_name} {person.last_name}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-[#183d3d] text-white p-3">
            {selectedPerson ? (
              `${selectedPerson.first_name} ${selectedPerson.last_name}`
            ) : (
              "Select a conversation"
            )}
          </div>
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div ref={chatMessagesRef} className="flex flex-col space-y-4">
              {selectedPerson ? (
                messages
                  .filter(msg => msg.receiver_id === selectedPerson.id || msg.sender_id === selectedPerson.id)
                  .map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg ${msg.sender_id === currentUser ? 'bg-[#183d3d] text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                      {msg.message}
                    </div>
                  ))
              ) : (
                <div>Select a person to start chatting</div>
              )}
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-300">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-[#183d3d] text-white px-4 py-2 rounded-lg hover:bg-[#1e4e4e]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
