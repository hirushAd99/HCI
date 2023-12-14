// AddStudent.jsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./addstudent.css"; // Import the CSS file
import axios from "axios";

const AddStudent = () => {
  const [formData, setStudent] = useState({
    StudentID: "",
    Name: "",
    MobileNumber: "",
    Address: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., sending data to the server
    console.log('Form submitted with data:', formData);
    // Reset the form fields
    setFormData({
      name: '',
      mobileNumber: '',
      address: '',
    });
  };
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/student", formData);
      setStudent({
        StudentID: "",
        Name: "",
        MobileNumber: "",
        Address: "",
      });
    } catch (err) {}
  };

  console.log(formData);

  return (
    <div className="add-student-page">
      <h1>Add New Student</h1>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student ID:</label>
          <input
            type="text"
            id="StudentID"
            name="StudentID"
            value={formData.StudentID}
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
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/selectionPage">
            <button
              className="submit-button"
              title="Navigates back to the selection page"
            >
              Go Back
            </button>
          </Link>
          <button
            type="submit"
            className="submit-button"
            title="Submits your selection"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
