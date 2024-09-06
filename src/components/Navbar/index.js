import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/customers-form" className="navbar-link">Customer Form</Link>
          </li>
          <li className="navbar-item">
            <Link to="/customers-list" className="navbar-link">Customer List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
