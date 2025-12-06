import React from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

// Use the environment variable or fallback to the deployed backend URL
// This ensures images load from the correct server whether you are on localhost or Render
const BASE_URL = import.meta.env.VITE_API_URL || 'https://pokemoncard-25nv.onrender.com';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Helper function to handle image source
  const getImgSrc = (imagePath) => {
    if (!imagePath) return "https://placehold.co/300x400?text=No+Image";
    
    // If it starts with http (e.g. Unsplash or external link), use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, it's a local upload, prepend the correct backend URL
    return `${BASE_URL}${imagePath}`;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={getImgSrc(product.image)} 
          alt={product.name} 
          className="product-image"
          // Optional: Add a fallback image if the source fails to load
          onError={(e) => { e.target.src = "https://placehold.co/300x400?text=Image+Not+Found"; }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-bottom">
          {/* Changed $ to ₹ */}
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;