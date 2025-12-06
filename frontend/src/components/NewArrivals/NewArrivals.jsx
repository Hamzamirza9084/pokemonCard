import React, { useEffect, useState } from 'react';
import api from '../../api/axios'; // Import your axios instance
import ProductCard from '../ProductCard/ProductCard'; // Reusing your existing card
import './NewArrivals.css';

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        // Fetch products sorted by newest, limited to 8
        const { data } = await api.get('/products?sort=newest&limit=8');
        setNewProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="new-arrivals-container">
      <h2 className="section-title">New Arrivals</h2>
      <div className="new-arrivals-grid">
        {newProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;