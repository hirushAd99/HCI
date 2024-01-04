-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2024 at 02:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentmasy`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `UserID` varchar(10) NOT NULL,
  `Name` text NOT NULL,
  `MobileNumber` varchar(10) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Details about teachers & Organizers';

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`UserID`, `Name`, `MobileNumber`, `UserName`, `Password`) VALUES
('T01', 'Teacher01', '0724235733', 'teacher1', '123456'),
('T02', 'Teacher02', '0777722332', 'teacher02', '12345'),
('T03', 'Teacher03', '0744722332', 'teacher03@gmail.com', '12345'),
('U01', 'Organizer01', '0711235633', 'organizer1', '123456'),
('U02', 'Organizer02', '0711232233', 'organizer2@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `ClassID` varchar(10) NOT NULL,
  `UserID` varchar(10) NOT NULL,
  `SubID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`ClassID`, `UserID`, `SubID`) VALUES
('C01', 'T01', 'S1'),
('C02', 'T02', 'S3'),
('C03', 'T03', 'S2');

-- --------------------------------------------------------

--
-- Table structure for table `classdetails`
--

CREATE TABLE `classdetails` (
  `ID` int(11) NOT NULL,
  `StudentID` varchar(10) NOT NULL,
  `ClassID` varchar(10) NOT NULL,
  `LastPaid` varchar(100) NOT NULL,
  `FiWeek` tinyint(4) NOT NULL,
  `SeWeek` tinyint(4) NOT NULL,
  `ThWeek` tinyint(4) NOT NULL,
  `FoWeek` tinyint(4) NOT NULL,
  `FfWeek` tinyint(4) NOT NULL,
  `Tute01` tinyint(4) NOT NULL,
  `Tute02` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classdetails`
--

INSERT INTO `classdetails` (`ID`, `StudentID`, `ClassID`, `LastPaid`, `FiWeek`, `SeWeek`, `ThWeek`, `FoWeek`, `FfWeek`, `Tute01`, `Tute02`) VALUES
(1, '10000', 'C01', 'March', 1, 0, 0, 0, 0, 1, 0),
(2, '10001', 'C01', 'February', 0, 0, 0, 0, 0, 0, 0),
(3, '10001', 'C02', 'February', 0, 0, 0, 0, 0, 0, 0),
(4, '10002', 'C02', 'March', 1, 0, 0, 0, 0, 0, 0),
(5, '10003', 'C01', 'February', 0, 0, 0, 0, 0, 0, 0),
(6, '10004', 'C03', 'February', 0, 0, 0, 0, 0, 0, 0),
(7, '10005', 'C02', 'March', 0, 0, 0, 0, 0, 0, 0),
(8, '10006', 'C03', 'February', 0, 0, 0, 0, 0, 0, 0),
(9, '10000', 'C03', 'March', 1, 0, 0, 0, 0, 1, 0),
(12, '10005', 'C03', 'March', 0, 0, 0, 0, 0, 0, 0),
(13, '10002', 'C03', 'Not Paid', 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `classdetailshistory`
--

CREATE TABLE `classdetailshistory` (
  `historyID` int(11) NOT NULL,
  `StudentID` varchar(10) NOT NULL,
  `ClassID` varchar(10) NOT NULL,
  `LastPaid` varchar(100) NOT NULL,
  `FiWeek` tinyint(4) NOT NULL,
  `SeWeek` tinyint(4) NOT NULL,
  `ThWeek` tinyint(4) NOT NULL,
  `FoWeek` tinyint(4) NOT NULL,
  `FfWeek` tinyint(4) NOT NULL,
  `Tute01` tinyint(4) NOT NULL,
  `Tute02` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classdetailshistory`
--

INSERT INTO `classdetailshistory` (`historyID`, `StudentID`, `ClassID`, `LastPaid`, `FiWeek`, `SeWeek`, `ThWeek`, `FoWeek`, `FfWeek`, `Tute01`, `Tute02`) VALUES
(1, '10000', 'C01', '0', 1, 1, 0, 0, 0, 1, 1),
(2, '10001', 'C01', '0', 1, 0, 1, 1, 1, 1, 1),
(3, '10001', 'C02', '0', 1, 0, 1, 1, 1, 1, 1),
(4, '10002', 'C02', '0', 0, 0, 0, 0, 0, 0, 0),
(5, '10003', 'C01', '0', 1, 1, 0, 1, 0, 1, 1),
(6, '10004', 'C03', '0', 0, 0, 0, 0, 0, 0, 0),
(7, '10005', 'C02', '0', 0, 0, 0, 0, 0, 0, 0),
(8, '10006', 'C03', '0', 0, 0, 0, 0, 0, 0, 0),
(9, '10000', 'C03', '0', 1, 1, 0, 0, 0, 1, 1),
(12, '10005', 'C03', '0', 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `StudentID` varchar(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `MobileNumber` varchar(10) NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`StudentID`, `Name`, `MobileNumber`, `Address`) VALUES
('10000', 'Student', '0778877341', '1st Lane, Colombo'),
('10001', 'Student1', '0777111717', 'Main Road, Colombo'),
('10002', 'Student2', '0227111717', 'Main Road, Colombo07'),
('10003', 'Student3', '0333111717', 'Main Road, Colombo08'),
('10005', 'Student04', '0237893456', 'Anuradhapura'),
('10006', 'Student05', '0777234944', 'Main Road, Galle');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `SubID` varchar(10) NOT NULL,
  `SubjectName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`SubID`, `SubjectName`) VALUES
('S1', 'Physics'),
('S2', 'Chemistry'),
('S3', 'Combined-Maths');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`ClassID`),
  ADD KEY `user` (`UserID`,`SubID`),
  ADD KEY `SubID` (`SubID`);

--
-- Indexes for table `classdetails`
--
ALTER TABLE `classdetails`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `classdetailshistory`
--
ALTER TABLE `classdetailshistory`
  ADD PRIMARY KEY (`historyID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`StudentID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`SubID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classdetails`
--
ALTER TABLE `classdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `classdetailshistory`
--
ALTER TABLE `classdetailshistory`
  MODIFY `historyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`SubID`) REFERENCES `subject` (`SubID`),
  ADD CONSTRAINT `class_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `adminuser` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
