// AddStudent.jsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./addstudent.css"; // Import the CSS file

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    UserID: "",
    Name: "",
    MobileNumber: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/addteachers",
        formData
      );

      console.log("Form submitted with data:", formData);
      console.log("Server response:", response.data);

      // Reset the form fields
      setFormData({
        UserID: "",
        Name: "",
        MobileNumber: "",
        Email: "",
        Password: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="add-student-page">
      <h1>Add New Teacher</h1>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Teacher ID:</label>
          <input
            type="text"
            id="UserID"
            name="UserID"
            value={formData.UserID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="MobileNumber"
            value={formData.MobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password:</label>
          <input
            type="text"
            id="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/selectionPage">
            <button className="submit-button">Go Back</button>
          </Link>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
