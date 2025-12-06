import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaUser, FaHeart, FaShoppingBag, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css'; 

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State for Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Hamburger Icon for Mobile */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <div className="logo-container">
        <Link to="/" onClick={closeMobileMenu}>
          <img src="/Images/logo4.png" alt="TCG Republic Logo" />
        </Link>
      </div>

      {/* Add 'active' class based on state */}
      <nav className={`nav-container ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="nav-menu">
          <li className="nav-item" onClick={closeMobileMenu}><Link to="/">Home</Link></li>
          
          {/* Pokemon TCG Dropdown */}
          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Pokemon TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/pokemon-tcg/booster-packs">Booster Packs</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/pokemon-tcg/booster-boxes">Booster Boxes</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/pokemon-tcg/single-cards">Single Cards</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/pokemon-tcg/decks">Decks</Link></li>
            </ul>
          </li>

          {/* One Piece TCG Dropdown */}
          <li className="nav-item dropdown-trigger">
            <span className="nav-label">One Piece TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/one-piece-tcg/booster-packs">Booster Packs</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/one-piece-tcg/booster-boxes">Booster Boxes</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/one-piece-tcg/single-cards">Single Cards</Link></li>
              <li className="dropdown-item" onClick={closeMobileMenu}><Link to="/collection/one-piece-tcg/magazines">Magazines</Link></li>
            </ul>
          </li>

          <li className="nav-item" onClick={closeMobileMenu}><Link to="/collection/accessories">Accessories</Link></li>
        </ul>
      </nav>

      <div className="nav-icons">
        <div className="icon-item mobile-hide">
            <FaSearch size={18} />
        </div>
        
        {user ? (
          <>
            <div className="icon-item mobile-hide" style={{ cursor: 'default', transform: 'none' }}>
               <span className="user-greeting">
                 Hi, {user.name.split(' ')[0]}
               </span>
            </div>
            <Link to="/profile" className="icon-item" title="My Profile">
               <FaUser size={18} />
            </Link>
            <div className="icon-item" onClick={handleLogout} title="Logout">
               <FaSignOutAlt size={18} />
            </div>
          </>
        ) : (
          <Link to="/login" className="icon-item">
            <FaUser size={18} />
          </Link>
        )}

        <div className="icon-item mobile-hide">
            <FaHeart size={18} />
        </div>
        
        <Link to="/cart" className="icon-item cart-container" style={{ color: 'inherit' }}>
            <FaShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;