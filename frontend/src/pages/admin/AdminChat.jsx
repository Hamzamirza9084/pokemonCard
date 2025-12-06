import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // For fetching all users
import './AdminChat.css';

const socket = io.connect("http://localhost:5000");

const AdminChat = () => {
  const [activeChatRoom, setActiveChatRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  const [onlineUsers, setOnlineUsers] = useState([]); // From Socket
  const [allUsers, setAllUsers] = useState([]);       // From DB

  // 1. Fetch All Users from DB on Mount
  // 1. Fetch All Users from DB on Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users'); 
        
        // Check if data is an array before setting it
        if (Array.isArray(data)) {
            setAllUsers(data);
        } else {
            console.error("API did not return an array:", data);
            setAllUsers([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching users", error);
        // Optional: Handle 401 unauthorized redirects here
      }
    };
    fetchUsers();
  }, []);

  // 2. Listen for Real-time Online Status & Messages
  useEffect(() => {
    socket.on("active_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receive_message", (data) => {
      if (data.room === activeChatRoom) {
        setMessageList((list) => [...list, data]);
      }
    });

    socket.on("load_messages", (history) => {
      setMessageList(history);
    });

    return () => {
      socket.off("active_users");
      socket.off("receive_message");
      socket.off("load_messages");
    };
  }, [activeChatRoom]);

  const joinChat = (userId) => {
    setActiveChatRoom(userId);
    setMessageList([]); 
    socket.emit("join_room", userId);
  };

  const sendMessage = async () => {
    if (currentMessage !== "" && activeChatRoom) {
      const messageData = {
        room: activeChatRoom,
        author: "Admin",
        message: currentMessage,
        isAdmin: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // Helper to check if a DB user is currently online
  const isOnline = (userId) => {
    return onlineUsers.some(u => u.userId === userId);
  };

  return (
    <div className="admin-chat-page">
      <h2>Support Dashboard</h2>
      
      <div className="admin-chat-container" style={{ display: 'flex', gap: '20px', height: '600px' }}>
        
        {/* --- USER LIST SIDEBAR --- */}
        <div className="user-list-sidebar" style={{ width: '250px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
            <h3 style={{padding: '10px', borderBottom: '1px solid #eee'}}>All Users</h3>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {allUsers.map((user) => (
                    <li 
                        key={user._id} 
                        onClick={() => joinChat(user._id)}
                        style={{
                            padding: '15px', 
                            borderBottom:'1px solid #eee', 
                            cursor: 'pointer',
                            backgroundColor: activeChatRoom === user._id ? '#eef' : 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span>{user.name}</span>
                        {/* Online Indicator */}
                        <span style={{
                            height: '10px',
                            width: '10px',
                            borderRadius: '50%',
                            backgroundColor: isOnline(user._id) ? '#28a745' : '#ccc',
                            boxShadow: isOnline(user._id) ? '0 0 5px #28a745' : 'none'
                        }}></span>
                    </li>
                ))}
            </ul>
        </div>

        {/* --- CHAT AREA --- */}
        <div className="admin-chat-box" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
           {activeChatRoom ? (
             <>
               <div className="chat-header-bar" style={{padding: '15px', background: '#333', color: 'white'}}>
                  Chatting with: {allUsers.find(u => u._id === activeChatRoom)?.name || "User"}
               </div>

               <div className="admin-messages-area">
                  {messageList.map((msg, key) => (
                    <div key={key} className={`msg-row ${msg.isAdmin ? 'admin-sent' : 'user-sent'}`}>
                       <span className="msg-bubble">{msg.message}</span>
                       <span className="msg-info">{msg.time}</span>
                    </div>
                  ))}
               </div>
               
               <div className="admin-input-area">
                  <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="Type reply..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
                  />
                  <button onClick={sendMessage}>Reply</button>
               </div>
             </>
           ) : (
             <div style={{padding:'20px', textAlign:'center', color:'#888', marginTop: 'auto', marginBottom: 'auto'}}>
                <h3>Select a user to view history</h3>
                <p>Green dot indicates user is currently online.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;