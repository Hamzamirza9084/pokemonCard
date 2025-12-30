import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard/ProductCard';

// Helper to format URL slugs back to readable text
const formatCategory = (slug) => {
  if (!slug) return '';
  if (slug === 'pokemon-tcg') return 'Pokemon TCG';
  if (slug === 'one-piece-tcg') return 'One Piece TCG';
  if (slug === 'booster-packs') return 'Booster Packs';
  if (slug === 'booster-boxes') return 'Booster Boxes';
  if (slug === 'single-cards') return 'Single Cards';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
};

const Collection = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert URL slugs to the exact strings stored in your DB
  const dbCategory = formatCategory(category);
  const dbSubcategory = subcategory ? formatCategory(subcategory) : null;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?category=${encodeURIComponent(dbCategory)}`;
        if (dbSubcategory) {
          url += `&subcategory=${encodeURIComponent(dbSubcategory)}`;
        }
        
        const { data } = await api.get(url);

        // --- ADDED: Sort products by Created Date (Descending / Newest First) ---
        // Checks for 'createdAt'. If missing, it falls back to '_id' (which is also time-sorted in MongoDB)
        const sortedData = data.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA; // Descending order
        });
        // -------------------------------------------------------------------------

        setProducts(sortedData);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, dbCategory, dbSubcategory]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textTransform: 'capitalize' }}>
        {dbCategory} {dbSubcategory && ` - ${dbSubcategory}`}
      </h1>
      <p>Browse our collection.</p>

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
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;