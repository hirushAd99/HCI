import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./attendance.css";

const AttendancePage = () => {
  const [classdetailsArr, setClassDetails] = useState([]);
  const [editedValues, setEditedValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { ClassID } = useParams();

  const fetchStudentsDet = async () => {
    try {
      console.log("ClassID:", ClassID);
      const res = await axios.get(
        `http://localhost:4001/attendance/${ClassID}`
      );
      console.log("Response:", res.data);
      setClassDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudentsDet();
  }, []);

  //New one
  const handleEditChange = (studentID, columnName, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [studentID]: {
        ...prevValues[studentID],
        StudentID: studentID,
        LastPaid: prevValues[studentID]?.LastPaid, // set default value
        FiWeek: prevValues[studentID]?.FiWeek, // set default value
        SeWeek: prevValues[studentID]?.SeWeek, // set default value
        ThWeek: prevValues[studentID]?.ThWeek, // set default value
        FoWeek: prevValues[studentID]?.FoWeek, // set default value
        FfWeek: prevValues[studentID]?.FfWeek, // set default value
        Tute01: prevValues[studentID]?.Tute01, // set default value
        Tute02: prevValues[studentID]?.Tute02, // set default value
        [columnName]: value,
      },
    }));
  };

  //New one

  const handleSaveChanges = async () => {
    try {
      // Convert the editedValues object into an array of objects
      const updatedValuesArray = Object.values(editedValues).map(
        (editedStudent) => ({
          StudentID: editedStudent.StudentID,
          LastPaid: editedStudent.LastPaid,
          FiWeek: editedStudent.FiWeek,
          SeWeek: editedStudent.SeWeek,
          ThWeek: editedStudent.ThWeek,
          FoWeek: editedStudent.FoWeek,
          FfWeek: editedStudent.FfWeek,
          Tute01: editedStudent.Tute01,
          Tute02: editedStudent.Tute02,
        })
      );

      // Send a PUT request to your backend endpoint with the updatedValuesArray
      const response = await axios.put(
        "http://localhost:4001/updateAttendance",
        updatedValuesArray
      );

      // Call fetchStudentsDet to refresh the data after saving changes
      fetchStudentsDet();
      if (response.status === 200) {
        alert("Saved successfully");
        // Redirect to the selection page if login is successful
      } else {
        alert("Invalid username or password");
      }
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
    <div className="attendance-container">
      <h1>Attendance of Students</h1>
      <div className="search-container">
        <h4>Search for students</h4>
        <input
          type="text"
          placeholder="Search....."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="fas fa-times" onClick={() => setSearchQuery("")}>
          Clear
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Last Paid</th>
            <th>First week</th>
            <th>Second week</th>
            <th>Third week</th>
            <th>Fourth week</th>
            <th>Fifth week</th>
            <th>Tute 01</th>
            <th>Tute 02</th>
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
                    <option value="Not Paid">Not Paid</option>
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
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.Tute01 === 1 ||
                      studentDeta.Tute01 === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "Tute01",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      editedValues[studentDeta.StudentID]?.Tute02 === 1 ||
                      studentDeta.Tute02 === 1
                    }
                    onChange={(e) =>
                      handleEditChange(
                        studentDeta.StudentID,
                        "Tute02",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="button-container">
        <Link to="/select-class">
          <button className="submit-button" title="To class selection page">
            Go Back
          </button>
        </Link>
        <button
          className="submit-button"
          onClick={handleSaveChanges}
          title="Saves changes of table"
        >
          Save Changes
        </button>
        <Link to="/add-student">
          <button className="submit-button" title="New student adding form">
            Add New Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AttendancePage;
