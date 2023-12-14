import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import "./addstudentclass.css";

const AddStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const res = await axios.get("http://localhost:4001/classes");
        setClassOptions(res.data);
      } catch (error) {
        console.error("Error fetching class options:", error);
      }
    };

    const fetchStudentOptions = async () => {
      try {
        const res = await axios.get("http://localhost:4001/studentID");
        setStudentOptions(res.data);
      } catch (error) {
        console.error("Error fetching student options:", error);
      }
    };

    fetchClassOptions();
    fetchStudentOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a class and student are selected
    if (selectedClass && studentId) {
      try {
        // Make a request to the server to add the student to the class
        const response = await axios.post(
          "http://localhost:4001/studentaddClass",
          {
            studentId: studentId, // Ensure this matches the expected name on the server
            classId: selectedClass.value,
          }
        );

        // Assuming the server returns a success status
        if (response.status === 200) {
          console.log("Student added to class successfully");
        } else {
          console.error("Failed to add student to class");
        }
      } catch (error) {
        console.error("Error adding student to class", error);
      }

      // Clear form
      setStudentId("");
      setSelectedClass(null);
    } else {
      console.log("Please select both a class and a student");
    }
  };

  return (
    <div className="add-student">
      <h1>Add Student to Class</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID:</label>
        <Select
          id="studentId"
          name="studentId"
          value={studentOptions.find((option) => option.value === studentId)}
          onChange={(selectedOption) =>
            setStudentId(selectedOption ? selectedOption.value : "")
          }
          options={studentOptions.map((studentOption) => ({
            value: studentOption.StudentID,
            label: studentOption.StudentID,
          }))}
          placeholder="Select Student"
          isSearchable
        />
        <label htmlFor="classId">Class:</label>
        <Select
          id="classId"
          name="classId"
          value={selectedClass}
          onChange={(selectedOption) => setSelectedClass(selectedOption)}
          options={classOptions.map((classOption) => ({
            value: classOption.ClassID,
            label: classOption.ClassID,
          }))}
          placeholder="Select Class"
          isSearchable
        />
        <div style={{ display: "flex" }}>
          <Link to="/selectionPage">
            <button className="submit-button">Go Back</button>
          </Link>
          <button className="submit-button" type="submit">
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
