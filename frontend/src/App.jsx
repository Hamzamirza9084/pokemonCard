import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // MUST be imported
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PokemonTCG from './pages/PokemonTCG';
import Supplies from './pages/Supplies';
import Cart from './pages/Cart'; 
import NotFound from './pages/NotFound';
import './App.css'; 

function App() {
  return (
    <CartProvider> {/* This is the crucial wrapper */}
      <BrowserRouter>
        <Routes>
          {/* Parent Route uses the Layout which contains Navbar */}
          <Route path="/" element={<MainLayout />}>
            
            {/* Child Routes (render inside Outlet of MainLayout) */}
            <Route index element={<Home />} />
            <Route path="pokemon-tcg" element={<PokemonTCG />} />
            <Route path="supplies" element={<Supplies />} />
            
            {/* Cart Route */}
            <Route path="cart" element={<Cart />} />
            
            {/* Dynamic Route Example */}
            <Route path="pokemon-tcg/:itemId" element={<PokemonTCG />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;