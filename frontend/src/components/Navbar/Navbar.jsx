import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaUser, FaHeart, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css'; 

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="/Images/logo.jpg" alt="TCG Republic Logo" />
        </Link>
      </div>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item"><Link to="/">Home</Link></li>
          
          <li className="nav-item dropdown-trigger">
            <span className="nav-label">Pokemon TCG <FaChevronDown className="arrow-icon"/></span>
            <ul className="dropdown">
              <li className="dropdown-item"><Link to="/pokemon-tcg">All Products</Link></li>
            </ul>
          </li>

          <li className="nav-item"><Link to="/supplies">Supplies</Link></li>
          <li className="nav-item"><Link to="/track-order">Track Order</Link></li>
        </ul>
      </nav>

      <div className="nav-icons">
        <div className="icon-item">
            <FaSearch size={18} />
        </div>
        
        {/* --- MODIFIED AUTH SECTION --- */}
        {user ? (
          <>
            {/* 1. User Greeting */}
            <div className="icon-item" style={{ cursor: 'default', transform: 'none' }}>
               <span className="user-greeting">
                 Hi, {user.name.split(' ')[0]}
               </span>
            </div>

            {/* 2. Profile Icon Link (NEW) */}
            <Link to="/profile" className="icon-item" title="My Profile">
               <FaUser size={18} />
            </Link>
            
            {/* 3. Logout Button */}
            <div className="icon-item" onClick={handleLogout} title="Logout">
               <FaSignOutAlt size={18} />
            </div>
          </>
        ) : (
          <Link to="/login" className="icon-item">
            <FaUser size={18} />
          </Link>
        )}
        {/* ----------------------------- */}

        <div className="icon-item">
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