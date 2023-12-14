// ClassDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassDetailsPage = () => {
  const [classDetails, setClassDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-server-url/api/classdetails');
        setClassDetails(response.data); // Assuming your API returns an array of class details
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Class Details Page</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Subject ID</th>
            <th>Last Paid</th>
            <th>First Week</th>
            <th>Second Week</th>
          </tr>
        </thead>
        <tbody>
          {classDetails.map((classDetail) => (
            <tr key={classDetail.id}>
              <td>{classDetail.StudentID}</td>
              <td>{classDetail.SubID}</td>
              <td>{classDetail.LastPaid}</td>
              <td>{classDetail.Fiweek}</td>
              <td>{classDetail.SeWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDetailsPage;
