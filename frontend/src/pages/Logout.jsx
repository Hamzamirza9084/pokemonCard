import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      // Optional: Add a small delay or show a message
      setTimeout(() => {
        navigate('/login');
      }, 1000); 
    };
    
    performLogout();
  }, [logout, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logging out...</h2>
      <p>Please wait while we securely sign you out.</p>
    </div>
  );
};

export default Logout;