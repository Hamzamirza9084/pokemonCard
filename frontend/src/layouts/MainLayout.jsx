import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renders the child route
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet is where Home, PokemonTCG, etc. will appear */}
      <main>
        <Outlet /> 
      </main>
      {/* <Footer /> can go here */}
    </>
  );
};

export default MainLayout;