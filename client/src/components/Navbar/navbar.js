import React from "react";
import { Link } from "react-router-dom";


const Navbar = ({ handleLogout, isAdmin }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        {isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
