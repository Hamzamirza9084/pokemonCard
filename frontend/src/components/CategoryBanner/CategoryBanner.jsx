import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryBanner.css';

const CategoryBanner = () => {
  return (
    <div className="category-banner-container">
      <div className="category-grid">
        
        {/* 1. Booster Packs Link */}
        {/* Note: Change the 'to' link to /collection/one-piece-tcg/... if you prefer One Piece */}
        <Link to="/collection/pokemon-tcg/booster-packs" className="category-item">
          <div className="image-wrapper">
             {/* Ensure this image exists in frontend/public/Images/ */}
            <img src="../../../public/Images/c1.jpeg" alt="Shop Booster Packs" />
          </div>
          <div className="category-label">
            <h3>Booster Packs</h3>
            <span>Shop Now</span>
          </div>
        </Link>

        {/* 2. Booster Boxes Link */}
        <Link to="/collection/pokemon-tcg/booster-boxes" className="category-item">
          <div className="image-wrapper">
            <img src="../../../public/Images/c2.jpeg" alt="Shop Booster Boxes" />
          </div>
          <div className="category-label">
            <h3>Booster Boxes</h3>
            <span>Shop Now</span>
          </div>
        </Link>

        {/* 3. Blister Packs Link (Assuming Single Cards or a specific Blister route) */}
        {/* Adjust this link if you have a specific blister pack route */}
        <Link to="/collection/pokemon-tcg/single-cards" className="category-item">
          <div className="image-wrapper">
            <img src="../../../public/Images/c3.jpeg" alt="Shop Blister Packs" />
          </div>
          <div className="category-label">
            <h3>Blister Packs & Singles</h3>
            <span>Shop Now</span>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default CategoryBanner;