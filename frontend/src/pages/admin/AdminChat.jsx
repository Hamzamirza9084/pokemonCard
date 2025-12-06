import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './AdminChat.css'; // Create basic styling for this page

const socket = io.connect("http://localhost:5000");

const AdminChat = () => {
  const [activeChatRoom, setActiveChatRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // In a real app, you'd fetch a list of active users/conversations from the DB
  // For this simple version, admin manually types the User ID to join
  // or you can list users connected to socket in backend and emit to admin
  const [targetUserId, setTargetUserId] = useState(""); 

  const joinChat = () => {
    if (targetUserId !== "") {
      setActiveChatRoom(targetUserId);
      socket.emit("join_room", targetUserId);
      // clear previous chat (in this simple memory-only version)
      setMessageList([]); 
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "" && activeChatRoom) {
      const messageData = {
        room: activeChatRoom,
        author: "Admin",
        message: currentMessage,
        isAdmin: true,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="admin-chat-page">
      <h2>Support Dashboard</h2>

      <div className="admin-chat-setup">
         <input 
           type="text" 
           placeholder="Enter User ID to Chat" 
           onChange={(e) => setTargetUserId(e.target.value)} 
         />
         <button onClick={joinChat}>Join Chat</button>
      </div>

      {activeChatRoom && (
        <div className="admin-chat-box">
           <h3>Chatting with: {activeChatRoom}</h3>
           <div className="admin-messages-area">
              {messageList.map((msg, key) => (
                <div key={key} className={`msg-row ${msg.isAdmin ? 'admin-sent' : 'user-sent'}`}>
                   <span className="msg-bubble">{msg.message}</span>
                   <span className="msg-info">{msg.time} - {msg.author}</span>
                </div>
              ))}
           </div>
           <div className="admin-input-area">
              <input 
                type="text" 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Reply</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminChat;