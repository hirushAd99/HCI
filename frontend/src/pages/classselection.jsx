import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./home.css";
import "./classselection.css";

const ClassSelectionPage = () => {
  const [classIDs, setClassIDs] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchClassIDs = async () => {
      try {
        const res = await axios.get("http://localhost:4001/classes");
        setClassIDs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassIDs();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleClear = () => {
    setSelectedClass("");
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:4001/resetData");
      // Optionally, you can fetch the updated class IDs after resetting data
      // await fetchClassIDs();
      console.log("Data reset successfully");
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

  return (
    <div className="page-container">
      <h1>Class Selection Page</h1>
      <div className="label-container">
        <label htmlFor="classDropdown">Select Class:</label>
      </div>
      <div className="select-container">
        <select
          id="classDropdown"
          value={selectedClass}
          onChange={handleClassChange}
        >
          <option value="">Select a Class</option>
          {classIDs.map((classID) => (
            <option key={classID} value={classID.ClassID}>
              {classID.ClassID}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <Link to="/selectionPage">
          <button className="submit-button">Go Back</button>
        </Link>
        <Link to={"/select-class"}>
          <button className="submit-button" onClick={handleReset}>
            Reset Data
          </button>
        </Link>
        <button className="submit-button" onClick={handleClear}>
          Clear Selection
        </button>
        <Link to={`/add-attendance/${selectedClass}`}>
          <button className="submit-button">Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default ClassSelectionPage;
