import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  // Implement logout logic here, such as removing the authentication token from storage
  localStorage.removeItem("authToken");
  // Redirect to the login page
  window.location.href = "/loginPage";
  alert("Log out Successfully");
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src="/Logo.jpg" alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/selectionPage">
          <button className="navbar-button" title="Directed to Home page">
            Home
          </button>
        </Link>
        <Link to="/select-class">
          <button className="navbar-button" title="Directed to selected page">
            Select Class
          </button>
        </Link>
        <Link to="/helpPage">
          <button className="navbar-button" title="Directed to help page">
            Help
          </button>
        </Link>
        <button
          onClick={handleLogout}
          title="Log out"
          className="navbar-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
