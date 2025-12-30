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
          onError={(e) => { e.target.src = "https://placehold.co/300x400?text=Image+Not+Found"; }}
        />
        {product.countInStock > 0 && product.countInStock < 5 && (
          <span className="stock-badge low-stock">Only {product.countInStock} left!</span>
        )}
      </div>

      <div className="product-info">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title" title={product.name}>{product.name}</h3>
        </div>
        
        {/* Improved Description Area */}
        <p className="product-description" title={product.description}>
          {product.description}
        </p>

        <div className="product-bottom">
          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? (
              <>
                <span className="btn-icon">+</span> Add
              </>
            ) : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;