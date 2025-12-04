import React from 'react';
import { Link } from 'react-router-dom';
// Import the specific icons seen in the image
import { FaChevronDown, FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './Navbar.css'; 
import logo from '../../../public/Images/logo.jpg'
const Navbar = () => {
  return (
    <header className="header">
      {/* 1. Logo Section */}
      <div className="logo-container">
        <Link to="/">
          {/* Ensure you have your logo at /public/images/logo.png */}
          <img src={logo} alt="TCG Republic Logo" />
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
            {/* Dropdown Content */}
            <ul className="dropdown">
              <li className="dropdown-item"><Link to="/pokemon-tcg/booster-packs">Booster Packs</Link></li>
              <li className="dropdown-item"><Link to="/pokemon-tcg/singles">Singles</Link></li>
              <li className="dropdown-item"><Link to="/pokemon-tcg/boxes">Booster Boxes</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/supplies">Supplies</Link>
          </li>

          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Other TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item"><Link to="/other-tcg/one-piece">One Piece</Link></li>
              <li className="dropdown-item"><Link to="/other-tcg/lorcana">Lorcana</Link></li>
            </ul>
          </li>

          <li className="nav-item">
             <Link to="/sports">Sports</Link>
          </li>

          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Figurine <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
               <li className="dropdown-item"><Link to="/figurine/anime">Anime</Link></li>
               <li className="dropdown-item"><Link to="/figurine/pop">Funko Pop</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/track-order">Track Order</Link>
          </li>
        </ul>
      </nav>

      {/* 3. Icons Section (Search, User, Heart, Cart) */}
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
        <div className="icon-item cart-container">
            <FaShoppingBag size={18} />
            {/* The pink notification badge */}
            <span className="cart-badge">1</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;