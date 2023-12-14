// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./selectionPage.css";

const HomePage = () => {
  return (
    <div className="selec-container">
      <h1>Home Page</h1>
      <div className="middle-section">
        <table>
          <tr>
            <td>
              <Link to="/select-class">
                <button className="action-button" title="Select a class">
                  Select Class
                </button>
              </Link>
            </td>
            <td>
              <Link to="/add-student">
                <button
                  className="action-button"
                  title="New student add option"
                >
                  Add New Student
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/selectionPage">
                <button className="action-button" title="New class add option">
                  Add New Class
                </button>
              </Link>
            </td>
            <td>
              <Link to="/add-teacher">
                <button
                  className="action-button"
                  title="New teacher add option"
                >
                  Add New Teacher
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/AddStu">
                <button className="action-button" title="Show class student">
                  View student
                </button>
              </Link>
            </td>
            <td>
              <Link to="/addstudentclass">
                <button
                  className="action-button"
                  title="Add new student to class"
                >
                  Add student to class
                </button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
