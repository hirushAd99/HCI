import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import SelectionPage from "./pages/selectionPage";
import StudentPage from "./pages/student";
import AddstudentPage from "./pages/addstudent";
import AddNewClass from "./pages/addclass";
import ClassSelection from "./pages/classselection";
import AddNewTeacher from "./pages/addteacher";
import AttendancePage from "./pages/attendanceCopy";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import InformationBar from "./components/informationbar";
import AddStudentClass from "./pages/addstudentclass";
import HelpPage from "./helppage/help";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AddStu" element={<StudentPage />} />
          <Route path="/add-student" element={<AddstudentPage />} />
          <Route path="/add-class" element={<AddNewClass />} />
          <Route path="/select-class" element={<ClassSelection />} />
          <Route path="/add-teacher" element={<AddNewTeacher />} />
          <Route path="/add-attendance/:ClassID" element={<AttendancePage />} />
          <Route path="/selectionPage" exact element={<SelectionPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/helpPage" element={<HelpPage />} />
          <Route path="/addstudentclass" element={<AddStudentClass />} />
        </Routes>
        <InformationBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
