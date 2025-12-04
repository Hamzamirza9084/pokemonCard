import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { FaChevronDown, /* other icons */ } from 'react-icons/fa';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
            <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          
          <li className="nav-item">
            <span className="nav-label">Pokemon TCG <FaChevronDown size={10}/></span>
            <ul className="dropdown">
              {/* Linking the dropdown items */}
              <li className="dropdown-item">
                <Link to="/pokemon-tcg/item-1">Item 1</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/pokemon-tcg/item-2">Item 2</Link>
              </li>
              <li className="dropdown-item">
                <Link to="/pokemon-tcg/item-3">Item 3</Link>
              </li>
              <li className="dropdown-item">
                 <Link to="/pokemon-tcg/item-4">Item 4</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/supplies">Supplies</Link>
          </li>
          
          {/* ... other links ... */}
        </ul>
      </nav>
      {/* ... icons ... */}
    </header>
  );
};

export default Navbar;