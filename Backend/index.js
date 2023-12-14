import express from "express";
import nodemon from "nodemon";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

//Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentmasy",
});

db.connect((err) => {
  if (err) {
    console.error("Error in database", err);
  } else {
    console.log("Connected to database.");
  }
});

app.use(express.json());
app.use(cors());

//Login
//const bcrypt = require('bcrypt');

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const q = "SELECT * FROM adminuser WHERE UserName = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 1) {
      const user = data[0];

      // Compare the provided password with the stored password in the database
      if (password === user.Password) {
        // Passwords match, login successful
        return res.json({ success: true });
      } else {
        // Passwords do not match, login failed
        return res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      // No user found with the provided username
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

//Adding new student
//Working
app.post("/student", (req, res) => {
  const q =
    "INSERT INTO `student`(`StudentID`, `Name`, `MobileNumber`, `Address`) VALUES (?)";
  const values = [
    req.body.StudentID,
    req.body.Name,
    req.body.MobileNumber,
    req.body.Address,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Added");
  });
});

//Working
app.post("/addteachers", (req, res) => {
  const { StudentID, Name, MobileNumber, Address } = req.body;

  // Insert data into the 'student' table
  const sql =
    "INSERT INTO student (StudentID, Name, MobileNumber, Address) VALUES (?, ?, ?, ?)";
  const values = [StudentID, Name, MobileNumber, Address];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Data inserted successfully");
    res.status(200).json({ message: "Data inserted successfully" });
  });
});

app.get("/classdetails", async (req, res) => {
  try {
    const result = await db.query(
      'SELECT `StudentID`, `LastPaid`, `FiWeek`, `SeWeek`, `ThWeek`, `FoWeek`, `FfWeek` FROM `classdetails` WHERE `SubID`= "S1"'
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error in fetch:", error);
    res.status(500).json({ error: "Internel server error" });
  }
});

app.get("/classes", async (req, res) => {
  const q = "SELECT `ClassID` FROM `class`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Student details view.
app.get("/student", (req, res) => {
  const q = "SELECT * FROM `student`";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/studentID", (req, res) => {
  const q = "SELECT `StudentID` FROM `student` WHERE 1";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Attendance page

app.get("/attendance/:ClassID", (req, res) => {
  const { ClassID } = req.params;
  const q = `SELECT StudentID, LastPaid, FiWeek, SeWeek, ThWeek, FoWeek, FfWeek ,Tute01 , Tute02 FROM classdetails WHERE ClassID = ?`;
  db.query(q, [ClassID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Update attendance & fee payment.
const updateAttendanceInDatabase = async (updatedValues) => {
  try {
    for (const updatedRecord of updatedValues) {
      const sql = `
           UPDATE classdetails
           SET LastPaid = ?, FiWeek = ?, SeWeek = ?, ThWeek = ?, FoWeek = ?, FfWeek = ? , Tute01 = ? , Tute02 = ?
           WHERE StudentID = ?
         `;
      const values = [
        updatedRecord.LastPaid,
        updatedRecord.FiWeek,
        updatedRecord.SeWeek,
        updatedRecord.ThWeek,
        updatedRecord.FoWeek,
        updatedRecord.FfWeek,
        updatedRecord.Tute01,
        updatedRecord.Tute02,
        updatedRecord.StudentID,
      ];

      await db.query(sql, values);
    }
  } catch (error) {
    console.error("Error updating attendance in the database:", error);
    throw error;
  }
};
app.put("/updateAttendance", async (req, res) => {
  const updatedValues = req.body;

  try {
    if (!Array.isArray(updatedValues)) {
      throw new Error("Invalid request payload. Expected an array.");
    }

    // Perform the database update using the updatedValues
    await updateAttendanceInDatabase(updatedValues);

    // Send a response indicating success
    res.status(200).send("Attendance updated successfully");
  } catch (error) {
    console.error("Error updating attendance in the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Reset the attendance table
//app.post("/backend/resetData",)

app.post("/resetData", (req, res) => {
  // Assuming your tables are named 'classdetails' and 'classdetailshistory'
  const sourceTable = "classdetails";
  const destinationTable = "classdetailshistory";

  // SQL query to move data from classdetails to classdetailshistory
  const moveDataQuery = `INSERT INTO ${destinationTable} SELECT * FROM ${sourceTable};`;

  // SQL query to update specific columns in classdetails
  const updateColumnsQuery = `
      UPDATE classdetails
      SET
        FiWeek = 0,
        SeWeek = 0,
        ThWeek = 0,
        FoWeek = 0,
        FfWeek = 0,
        Tute01 = 0,
        Tute02 = 0;
  `;

  // Execute the first query to move data to history table
  db.query(moveDataQuery, (error1, results1) => {
    if (error1) {
      console.error("Error moving data to history table:", error1);
      res.status(500).json({ message: "Error resetting data" });
    } else {
      // Execute the second query to update columns in classdetail
      db.query(updateColumnsQuery, (error2, results2) => {
        if (error2) {
          console.error("Error updating columns in classdetail:", error2);
          res.status(500).json({ message: "Error resetting data" });
        } else {
          res.json({ message: "Data reset successfully" });
          res.redirect("/select-class");
        }
      });
    }
  });
});

//studentaddClass

app.post("/studentaddClass", (req, res) => {
  const { studentId, classId } = req.body;

  // Insert data into the 'classdetails' table
  const sql = `
    INSERT INTO classdetails ( StudentID, ClassID, LastPaid, FiWeek, SeWeek, ThWeek, FoWeek, FfWeek, Tute01, Tute02)
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    studentId,
    classId,
    "Not Paid", // Replace with the actual LastPaid value
    "0", // Replace with the actual FiWeek value
    "0", // Replace with the actual SeWeek value
    "0", // Replace with the actual ThWeek value
    "0", // Replace with the actual FoWeek value
    "0", // Replace with the actual FfWeek value
    "0", // Replace with the actual Tute01 value
    "0", // Replace with the actual Tute02 value
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Data inserted into classdetails successfully");
    res
      .status(200)
      .json({ message: "Data inserted into classdetails successfully" });
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
