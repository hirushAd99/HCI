import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./student.css";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:4001/student");
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);

  // Search option.
  const filteredStudents = students.filter((student) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      student.StudentID.toLowerCase().includes(searchValue) ||
      student.Name.toLowerCase().includes(searchValue) ||
      student.MobileNumber.toLowerCase().includes(searchValue) ||
      student.Address.toLowerCase().includes(searchValue)
    );
  });

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <h1>Students of Class</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ marginRight: "20px" }}>Search for students</h4>
        <input
          type="text"
          placeholder="Search....."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.StudentID}
              style={{
                background:
                  selectedStudent &&
                  selectedStudent.StudentID === student.StudentID
                    ? "yellow"
                    : "none",
              }}
              onClick={() => handleRowClick(student)}
            >
              <td>{student.StudentID}</td>
              <td>{student.Name}</td>
              <td>{student.MobileNumber}</td>
              <td>{student.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/selectionPage">
        <button className="submit-button" title="Back to selection page">
          Go Back
        </button>
      </Link>
      <Link to="/AddNewStu">
        <button className="submit-button" title="New student form">
          Add New Student
        </button>
      </Link>
    </div>
  );
};

export default StudentPage;
