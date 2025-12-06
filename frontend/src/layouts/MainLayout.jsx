import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ChatWidget from '../components/ChatWidget/ChatWidget';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* ChatWidget handles the socket connection internally */}
      <ChatWidget /> 
    </div>
  );
};

export default MainLayout;