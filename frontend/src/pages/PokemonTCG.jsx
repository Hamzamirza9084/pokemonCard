import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard/ProductCard';

const PokemonTCG = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching items specifically for Pokemon TCG category
        // Alternatively, fetch all and filter on frontend if dataset is small
        const { data } = await api.get('/products?category=Pokemon TCG');
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Could not load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div style={{ padding: '40px' }}>Loading products...</div>;
  if (error) return <div style={{ padding: '40px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Pokemon TCG</h1>
      <p>Browse our collection of cards and boosters.</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px', 
        marginTop: '30px' 
      }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found. Try running the seeder script in the backend!</p>
        )}
      </div>
    </div>
  );
};

export default PokemonTCG;