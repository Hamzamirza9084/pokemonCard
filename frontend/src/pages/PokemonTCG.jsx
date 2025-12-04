import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonTCG = () => {
  // useParams extracts the 'itemId' from the URL defined in App.jsx
  // route: path="pokemon-tcg/:itemId"
  const { itemId } = useParams();

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Pokemon TCG Section</h1>
      
      {itemId ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2 style={{ textTransform: 'capitalize' }}>You selected: {itemId.replace('-', ' ')}</h2>
          <p>Here are the details for {itemId}...</p>
          {/* You would fetch data from a database here using the itemId */}
        </div>
      ) : (
        <p>Select an item from the menu or browse all categories below.</p>
      )}

      {/* Grid of generic cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '40px' }}>
         <div style={{ height: '200px', background: '#eee' }}>Card 1</div>
         <div style={{ height: '200px', background: '#eee' }}>Card 2</div>
         <div style={{ height: '200px', background: '#eee' }}>Card 3</div>
         <div style={{ height: '200px', background: '#eee' }}>Card 4</div>
      </div>
    </div>
  );
};

export default PokemonTCG;