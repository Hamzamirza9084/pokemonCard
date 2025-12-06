import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext'; // To get user ID
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './ChatWidget.css';

// Connect to backend
const socket = io.connect("http://localhost:5000");

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Use user ID as room, or a random ID if guest (handling guests requires more logic, utilizing user._id for now)
  const roomId = user ? user._id : "guest"; 

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    // Cleanup listener
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        author: user ? user.name : "Guest",
        message: currentMessage,
        isAdmin: false, // This is a user message
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

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
                  <p id="author">{msg.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}
            />
            <button onClick={sendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;