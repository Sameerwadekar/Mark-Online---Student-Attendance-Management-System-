import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import LoadingBar from "react-top-loading-bar";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

function AttendanceHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("LogOut Successfully");
    setTimeout(() => {
      navigate(`${BASE_URL}/login`);
    }, 1000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    try {
      setLoggedInUser(storedUser ? JSON.parse(storedUser) : "");
    } catch (error) {
      setLoggedInUser(storedUser || "");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/attendance/records`)
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, []);
  const handleAttendanceHistory = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate("/history"), 900);
  };

  const handleAttendance = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate("/home"), 900);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white p-6">
        <div className="w-full bg-purple-700 text-white shadow-md fixed top-0 left-0">
          <nav className="container mx-auto flex flex-wrap justify-between items-center p-3">
            <div className="flex items-center ml-0">
              <img
                src={logo}
                alt="Mark Online Logo"
                className="w-10 h-10 bg-transparent"
              />
              <h1 className="text-lg md:text-xl font-semibold">Mark Online</h1>
            </div>

            <div className="hidden lg:flex space-x-6 cursor-pointer">
              <ul className="flex space-x-6">
                <li onClick={handleAttendance} className="hover:underline">
                  Attendance
                </li>
                <li
                  onClick={handleAttendanceHistory}
                  className="hover:underline"
                >
                  Attendance Records
                </li>
              </ul>
            </div>

            <div
              className="hidden lg:flex items-center gap-1 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h6 className="text-lg md:text-xl">Hello, {loggedInUser}👋</h6>
              <MdOutlineArrowDropDownCircle size={30} />

              {isOpen && (
                <button
                  className="absolute right-4 md:right-12 mt-12 md:mt-28 text-white text-sm font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 w-28 h-8 shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              )}
            </div>

            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
                ☰
              </button>
            </div>
          </nav>

          {isOpen && (
            <div className="lg:hidden flex flex-col items-center bg-purple-800 text-white p-3 space-y-3 shadow-md">
              <ul className="space-y-3 text-center">
                <li onClick={handleAttendance} className="hover:underline">
                  Attendance
                </li>
                <li
                  onClick={handleAttendanceHistory}
                  className="hover:underline"
                >
                  Attendance Records
                </li>
                <li>
                  <button
                    className="text-sm font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-20 space-y-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Attendance Records
          </h1>
          <div className="space-y-4">
            {attendanceData.length > 0 ? (
              attendanceData.map((record) => (
                <AttendanceCard key={record._id} record={record} />
              ))
            ) : (
              <p className="text-center text-gray-300">
                No attendance records found.
              </p>
            )}
          </div>
        </div>
      </div>
      <LoadingBar
        color="#ff416c"
        height={3}
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
    </>
  );
}

function AttendanceCard({ record }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Course: ${record.course}`, 14, 25);
    doc.text(`Subject: ${record.subject}`, 14, 32);
    doc.text(`Semester: ${record.semester}`, 14, 39);
    doc.text(`Date: ${new Date(record.date).toDateString()}`, 14, 46);

    const tableColumn = ["Roll Number", "Student Name"];
    const tableRows = record.students
      .filter((s) => s.status === "Present")
      .map((s) => [s.roll, s.name]);

    autoTable(doc, {
      startY: 55,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`Attendance_${record.subject}_${record.date}.pdf`);
  };

  return (
    <>
      <div className="bg-white text-black p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">
          {record.subject} - {record.course} ( {record.semester})
        </h2>
        <p className="text-gray-700">
          Date: {new Date(record.date).toDateString()}
        </p>
        <div className="flex flex-row  gap-3">
          <button
            className="mt-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Hide Details" : "View Attendance"}
          </button>
          <button
            className="mt-2 ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            onClick={generatePDF}
          >
            Generate PDF
          </button>
        </div>

        {isOpen && (
          <div className="mt-3">
            <h3 className="font-semibold">Present Students:</h3>
            <ul className="list-disc pl-5">
              {record.students
                .filter((s) => s.status === "Present")
                .map((s) => (
                  <li key={s._id}>
                    {s.name} (Roll: {s.roll})
                  </li>
                ))}
            </ul>

            {/* <h3 className="font-semibold mt-2">Absent Students:</h3>
            <ul className="list-disc pl-5">
              {record.students
                .filter((s) => s.status === "Absent")
                .map((s) => (
                  <li key={s._id}>
                    {s.name} (Roll: {s.roll})
                  </li>
                ))}
            </ul> */}
          </div>
        )}
      </div>
      <LoadingBar
        color="#ff416c"
        height={3}
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
}

export default AttendanceHistory;
