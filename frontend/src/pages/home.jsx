import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className="middle-section">
        <div className="left-section">
          <h1 style={{ color: "#333" }}>Student Management System</h1>
        </div>
        <div className="right-section">
          <Link to="/loginPage">
            <button className="action-button">Login</button>
          </Link>
          <div className="button-container">
            <div className="about-section">
              <h2>About</h2>
              <p className="about-paragraph">
                Empower your private class with our Student Management System, a
                robust solution for efficient class management, attendance
                tracking, and seamless communication between students and
                instructors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
