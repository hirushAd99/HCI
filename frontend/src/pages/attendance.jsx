import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./student.css";

const AttendancePage = () => {
  const [classdetailsArr, setClassDetails] = useState([]);
  const [editedValues, setEditedValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudentsDet = async () => {
    try {
      const res = await axios.get("http://localhost:4001/attendance");
      setClassDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudentsDet();
  }, []);

  const handleEditChange = (studentID, columnName, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [studentID]: {
        ...prevValues[studentID],
        [columnName]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Convert the editedValues object into an array of objects
      const updatedValuesArray = Object.keys(editedValues).map((studentID) => ({
        StudentID: studentID,
        ...editedValues[studentID],
      }));

      // Send a PUT request to your backend endpoint with the updatedValuesArray
      await axios.put(
        "http://localhost:4001/updateAttendance",
        updatedValuesArray
      );

      // Call fetchStudentsDet to refresh the data after saving changes
      fetchStudentsDet();
    } catch (err) {
      console.log(err);
    }
  };

  // Search option.
  const filteredData = classdetailsArr.filter((student) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      student.StudentID.toLowerCase().includes(searchValue) ||
      student.LastPaid.toLowerCase().includes(searchValue)
      // Add other fields as needed
    );
  });

  return (
    <div>
      <h1>Attendance of Students</h1>
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
            <th>Last Paid</th>
            <th>Fi week</th>
            <th>Se week</th>
            <th>Th week</th>
            <th>Fo week</th>
            <th>Ff week</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredData) &&
            filteredData.map((studentDeta) => (
              <tr
                key={studentDeta.StudentID}
                style={{
                  background:
                    studentDeta.StudentID === searchQuery ? "yellow" : "none",
                }}
              >
                <td>{studentDeta.StudentID}</td>
                <td>
                  <select
                    value={
                      editedValues[studentDeta.StudentID]?.LastPaid ||
                      studentDeta.LastPaid
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "LastPaid",
                        e.target.value
                      )
                    }
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                    {/* Add other months as needed */}
                  </select>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.FiWeek === 1 ||
                      studentDeta.FiWeek === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "FiWeek",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.SeWeek === 1 ||
                      studentDeta.SeWeek === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "SeWeek",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.ThWeek === 1 ||
                      studentDeta.ThWeek === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "ThWeek",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.FoWeek === 1 ||
                      studentDeta.FoWeek === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "FoWeek",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.FfWeek === 1 ||
                      studentDeta.FfWeek === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "FfWeek",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/select-class">
        <button className="submit-button">Go Back</button>
      </Link>
      <button className="submit-button" onClick={handleSaveChanges}>
        Save Changes
      </button>

      <Link to="/add-student">
        <button className="submit-button">Add New Student</button>
      </Link>
    </div>
  );
};

export default AttendancePage;
