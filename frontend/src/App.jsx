import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PokemonTCG from './pages/PokemonTCG';
import Supplies from './pages/Supplies';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route uses the Layout */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Child Routes (render inside Outlet) */}
          <Route index element={<Home />} />
          <Route path="pokemon-tcg" element={<PokemonTCG />} />
          <Route path="supplies" element={<Supplies />} />
          
          {/* Dynamic Route Example (for Item 1, Item 2) */}
          <Route path="pokemon-tcg/:itemId" element={<PokemonTCG />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;