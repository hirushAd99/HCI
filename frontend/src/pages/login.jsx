import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a request to the server to check authentication
      const response = await axios.post("http://localhost:4001/login", {
        username,
        password,
      });

      // Assuming the server returns a success status
      if (response.status === 200) {
        // Redirect to the selection page if login is successful
        navigate("/selectionPage");
        <Link to="/selectionPage" />;
        alert("Login Successful.");
        console.log(response);
      } else {
        // Display an error message if login fails
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      // Handle errors, e.g., network issues, server errors, etc.
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <div className="form-box">
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="submit-button" onClick={handleLogin}>
            Submit
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
