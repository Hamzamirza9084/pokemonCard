import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PokemonTCG from './pages/PokemonTCG';
import Supplies from './pages/Supplies';
import Cart from './pages/Cart'; 
import Login from './pages/Login';       // Import Login
import Register from './pages/Register'; // Import Register
import NotFound from './pages/NotFound';
import Logout from './pages/Logout';
import Profile from './pages/Profile';   // <-- New: Import Profile
import './App.css'; 

function App() {
  return (
    <AuthProvider> {/* Outer wrapper for Auth */}
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              
              <Route index element={<Home />} />
              <Route path="pokemon-tcg" element={<PokemonTCG />} />
              <Route path="supplies" element={<Supplies />} />
              
              <Route path="cart" element={<Cart />} />
              
              {/* Auth Routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<Logout />} />
              
              {/* Profile Route */}
              <Route path="profile" element={<Profile />} /> {/* <-- New Route */}

              <Route path="pokemon-tcg/:itemId" element={<PokemonTCG />} />
              <Route path="*" element={<NotFound />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;