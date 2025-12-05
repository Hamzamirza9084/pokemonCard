import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; // Import Context
import './Navbar.css'; 

const Navbar = () => {
  const { cartCount } = useCart(); // Get live count

  return (
    <header className="header">
      {/* 1. Logo Section */}
      <div className="logo-container">
        <Link to="/">
          <img src="/Images/logo.jpg" alt="TCG Republic Logo" />
        </Link>
      </div>

      {/* 2. Navigation Menu */}
      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          
          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Pokemon TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item"><Link to="/pokemon-tcg">All Products</Link></li>
              {/* Add more links as needed */}
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/supplies">Supplies</Link>
          </li>

          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Other TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item"><Link to="/other-tcg/one-piece">One Piece</Link></li>
            </ul>
          </li>

          <li className="nav-item">
             <Link to="/sports">Sports</Link>
          </li>

          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Figurine <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
               <li className="dropdown-item"><Link to="/figurine/anime">Anime</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/track-order">Track Order</Link>
          </li>
        </ul>
      </nav>

      {/* 3. Icons Section */}
      <div className="nav-icons">
        <div className="icon-item">
            <FaSearch size={18} />
        </div>
        <div className="icon-item">
            <FaUser size={18} />
        </div>
        <div className="icon-item">
            <FaHeart size={18} />
        </div>
        <Link to="/cart" className="icon-item cart-container" style={{ color: 'inherit' }}>
            <FaShoppingBag size={18} />
            {/* Conditionally render badge if count > 0 */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;