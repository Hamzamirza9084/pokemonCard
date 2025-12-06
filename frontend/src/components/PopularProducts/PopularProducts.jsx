import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import ProductCard from '../ProductCard/ProductCard';
import './PopularProducts.css';

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        // Fetch all products. In a real app, you might have a specific endpoint 
        // like /products?sort=popular or /products?featured=true
        const { data } = await api.get('/products');
        
        // For now, let's take the first 4 products as "Most Popular"
        // You can also shuffle them or filter by a 'rating' field if you add one.
        setPopularProducts(data.slice(0, 4)); 
      } catch (error) {
        console.error("Failed to fetch popular products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) return <div className="popular-loading">Loading popular items...</div>;

  return (
    <div className="popular-products-section">
      <h2 className="section-title">Most Popular Cards</h2>
      <div className="popular-grid">
        {popularProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;