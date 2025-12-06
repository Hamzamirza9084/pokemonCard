import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, FaSignOutAlt, FaHome, FaComments } from 'react-icons/fa'; // Added FaComments
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="admin-sidebar">
      <div className="admin-logo">
        <h2>Admin Panel</h2>
      </div>
      
      <ul className="admin-nav-links">
        <li>
          <Link to="/admin/dashboard">
            <FaTachometerAlt className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/productlist">
            <FaBox className="icon" /> Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orderlist">
            <FaShoppingBag className="icon" /> Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/userlist">
            <FaUsers className="icon" /> Users
          </Link>
        </li>
        {/* --- Added Chat Link Below --- */}
        <li>
          <Link to="/admin/chat">
            <FaComments className="icon" /> Support Chat
          </Link>
        </li>
        {/* ----------------------------- */}
        <li className="divider"></li>
        <li>
          <Link to="/">
            <FaHome className="icon" /> Go to Public Site
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="icon" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;