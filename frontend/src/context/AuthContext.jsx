import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password });
    setUser(data);
    return data;
  };

  // Register function
const register = async (name, email, password) => {
    // 🔴 OLD (Incorrect):
    // const { data } = await api.post('/users', { name, email, password });

    // 🟢 NEW (Correct):
    const { data } = await api.post('/users/register', { name, email, password });
    
    setUser(data);
    return data;
  };

  // Logout function
  const logout = async () => {
    await api.post('/users/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};