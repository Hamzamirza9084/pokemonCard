import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { FaComments, FaPaperPlane, FaTimes, FaUserLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ChatWidget.css';

// Logic to determine the backend URL for Socket.io
// It takes VITE_API_URL (e.g., "https://my-api.com/api") and removes "/api" to get the root URL
const BACKEND_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '') 
  : "http://localhost:5000";

const socket = io.connect(BACKEND_URL);

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (user && isOpen) {
      socket.emit("join_room", { userId: user._id, userName: user.name });
    }
  }, [user, isOpen]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    
    // --- NEW: LISTEN FOR HISTORY ---
    socket.on("load_messages", (history) => {
      setMessageList(history);
    });

    return () => {
      socket.off("receive_message");
      socket.off("load_messages");
    };
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "" && user) {
      const messageData = {
        room: user._id,
        author: user.name,
        message: currentMessage,
        isAdmin: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  if (!user) {
    return (
        <div className="chat-widget-container">
            <Link to="/login" className="chat-toggle-btn" style={{backgroundColor: '#6c757d'}}>
                <FaUserLock size={20} /> Login to Chat
            </Link>
        </div>
    );
  }

  return (
    <div className="chat-widget-container">
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <FaComments size={24} /> Chat with Us
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Support</p>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>
          <div className="chat-body">
            {messageList.map((msg, index) => (
              <div key={index} className={`message-container ${msg.isAdmin ? "admin" : "you"}`}>
                <div className="message-content">
                  <p>{msg.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{msg.time}</p>
                  <p id="author">{msg.isAdmin ? "Support" : "You"}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
            />
            <button onClick={sendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;