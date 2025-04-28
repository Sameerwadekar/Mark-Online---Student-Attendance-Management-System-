import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/logo.png";
import LoadingBar from "react-top-loading-bar";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    try {
      setLoggedInUser(storedUser ? JSON.parse(storedUser) : "");
    } catch (error) {
      setLoggedInUser(storedUser || "");
    }
  }, []);

  useEffect(() => {
    if (!selectedCourse || !selectedYear) return;

    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/students/course/${selectedCourse}/year/${selectedYear}`
        );

        if (Array.isArray(data)) {
          setStudents(data);
        } else if (data.students) {
          setStudents(data.students);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students", error);
        setStudents([]);
      }
    };
    fetchStudents();
  }, [selectedCourse, selectedYear]);

  const courseOptions = {
    Bcom: {
      FY: {
        semesters: ["Sem 1", "Sem 2"],
        subjects: {
          "Sem 1": [
            "Accounting",
            "Economics",
            "Statistics",
            "Business Studies",
            "Banking",
            "Corporate Law",
          ],
          "Sem 2": [
            "Business Law",
            "Taxation",
            "Cost Accounting",
            "Auditing",
            "Marketing",
            "Management Accounting",
          ],
        },
      },
      SY: {
        semesters: ["Sem 3", "Sem 4"],
        subjects: {
          "Sem 3": [
            "Management",
            "Finance",
            "E-Commerce",
            "Investment Analysis",
            "Business Ethics",
            "Research Methodology",
          ],
          "Sem 4": [
            "Marketing",
            "HRM",
            "Consumer Behavior",
            "International Trade",
            "Business Communication",
            "Entrepreneurship",
          ],
        },
      },
      TY: {
        semesters: ["Sem 5", "Sem 6"],
        subjects: {
          "Sem 5": [
            "Auditing",
            "Business Ethics",
            "Corporate Finance",
            "Banking Operations",
            "Risk Management",
            "Insurance",
          ],
          "Sem 6": [
            "International Business",
            "Entrepreneurship",
            "Strategic Management",
            "Mergers & Acquisitions",
            "Supply Chain Management",
            "Financial Derivatives",
          ],
        },
      },
    },
    Bsc: {
      FY: {
        semesters: ["Sem 1", "Sem 2"],
        subjects: {
          "Sem 1": [
            "Physics",
            "Chemistry",
            "Mathematics",
            "Biology",
            "Computer Science",
            "Statistics",
          ],
          "Sem 2": [
            "Genetics",
            "Microbiology",
            "Botany",
            "Zoology",
            "Environmental Science",
            "Biotechnology",
          ],
        },
      },
      SY: {
        semesters: ["Sem 3", "Sem 4"],
        subjects: {
          "Sem 3": [
            "Organic Chemistry",
            "Physical Chemistry",
            "Analytical Chemistry",
            "Astronomy",
            "Geophysics",
            "Quantum Mechanics",
          ],
          "Sem 4": [
            "Nuclear Physics",
            "Molecular Biology",
            "Genomics",
            "Ecology",
            "Oceanography",
            "Data Science",
          ],
        },
      },
      TY: {
        semesters: ["Sem 5", "Sem 6"],
        subjects: {
          "Sem 5": [
            "Bioinformatics",
            "Pharmacology",
            "Immunology",
            "Machine Learning",
            "Robotics",
            "Cybersecurity",
          ],
          "Sem 6": [
            "Advanced Genetics",
            "Artificial Intelligence",
            "Medical Physics",
            "Climate Science",
            "Neuroscience",
            "Epidemiology",
          ],
        },
      },
    },
    BMM: {
      FY: {
        semesters: ["Sem 1", "Sem 2"],
        subjects: {
          "Sem 1": [
            "Mass Communication",
            "Journalism",
            "Photography",
            "Advertising",
            "Public Relations",
            "Creative Writing",
          ],
          "Sem 2": [
            "Media Studies",
            "Film Appreciation",
            "Radio Production",
            "Television Studies",
            "Social Media",
            "Cultural Studies",
          ],
        },
      },
      SY: {
        semesters: ["Sem 3", "Sem 4"],
        subjects: {
          "Sem 3": [
            "Digital Marketing",
            "Brand Management",
            "Script Writing",
            "Video Editing",
            "Web Content",
            "Animation",
          ],
          "Sem 4": [
            "Film Production",
            "Graphic Design",
            "Event Management",
            "Corporate Communication",
            "Podcasting",
            "Visual Storytelling",
          ],
        },
      },
      TY: {
        semesters: ["Sem 5", "Sem 6"],
        subjects: {
          "Sem 5": [
            "Media Law",
            "Cinematography",
            "Sound Design",
            "Public Speaking",
            "Investigative Journalism",
            "Political Communication",
          ],
          "Sem 6": [
            "Screenplay Writing",
            "Crisis Communication",
            "Marketing Psychology",
            "UX Design",
            "Game Development",
            "Documentary Production",
          ],
        },
      },
    },
    Baf: {
      FY: {
        semesters: ["Sem 1", "Sem 2"],
        subjects: {
          "Sem 1": [
            "Financial Accounting",
            "Business Economics",
            "Commerce",
            "Business Law",
            "Mathematics",
            "Environmental Studies",
          ],
          "Sem 2": [
            "Cost Accounting",
            "Taxation",
            "Auditing",
            "Financial Management",
            "Statistics",
            "Communication Skills",
          ],
        },
      },
      SY: {
        semesters: ["Sem 3", "Sem 4"],
        subjects: {
          "Sem 3": [
            "Corporate Accounting",
            "Management Accounting",
            "Direct Tax",
            "Business Communication",
            "Financial Markets",
            "Econometrics",
          ],
          "Sem 4": [
            "Advanced Financial Accounting",
            "Indirect Tax",
            "Investment Analysis",
            "Portfolio Management",
            "Risk Management",
            "Operations Research",
          ],
        },
      },
      TY: {
        semesters: ["Sem 5", "Sem 6"],
        subjects: {
          "Sem 5": [
            "International Finance",
            "Strategic Cost Management",
            "Mergers & Acquisitions",
            "Banking & Insurance",
            "Forensic Accounting",
            "Financial Analytics",
          ],
          "Sem 6": [
            "Corporate Finance",
            "Advanced Auditing",
            "Derivative Markets",
            "Wealth Management",
            "Behavioral Finance",
            "Ethics in Finance",
          ],
        },
      },
    },
  };

  useEffect(() => {
    if (selectedCourse && selectedYear && selectedSemester) {
      setSubjects(
        courseOptions[selectedCourse]?.[selectedYear]?.subjects[
          selectedSemester
        ] || []
      );
    } else {
      setSubjects([]);
    }
  }, [selectedCourse, selectedYear, selectedSemester]);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setProgress(60);
    setTimeout(() => setProgress(100), 400);
    handleSuccess("LogOut Successfully");
    setTimeout(() => {
      navigate(`/login`);
    }, 1000);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const submitAttendance = async () => {
    const allMarked = students.every(
      (student) =>
        attendance[student._id] === "Present" ||
        attendance[student._id] === "Absent"
    );

    if (!allMarked) {
      toast.error("Empty Student Attendance Found");
      return;
    }

    if (!selectedSemester || !selectedSubject) {
      handleError("Fill All Required Fields Eg.{Semester,Subject}");
    } else {
      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/api/attendance/mark`, {
          attendanceData: attendance,
          date: date,
          subject: selectedSubject,
          semester: selectedSemester,
        });
        handleSuccess("Attendance Submitted Successfully");
      } catch (error) {
        handleError("Blank Status Found");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAttendanceHistory = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate(`${BASE_URL}/history`), 900);
  };

  const handleAttendance = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate(`/home`), 900);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-black text-white p-6">
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
              <li onClick={handleAttendanceHistory} className="hover:underline">
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
              <li onClick={handleAttendanceHistory} className="hover:underline">
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

      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mt-36">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Mark Attendance
        </h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-2 text-black ">Date:</label>
          <input
            type="date"
            className="w-full p-2 text-black  mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            min={today}
          />

          <label className="block mb-2 text-black">Select Class:</label>
          <select
            className="w-full p-2  text-black mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedYear("");
              setSelectedSemester("");
              setSubjects([]);
            }}
          >
            <option value="">Select</option>
            {Object.keys(courseOptions).map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-black">Select Year:</label>
          <select
            className="w-full p-2   text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSemester("");
              setSubjects([]);
            }}
            disabled={!selectedCourse}
          >
            <option value="">Select</option>
            {selectedCourse &&
              Object.keys(courseOptions[selectedCourse]).map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
          </select>

          <label className="block mb-2 text-black">Select Semester:</label>
          <select
            className="w-full p-2  text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            disabled={!selectedYear}
          >
            <option value="">Select</option>
            {selectedYear &&
              courseOptions[selectedCourse][selectedYear].semesters.map(
                (sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                )
              )}
          </select>

          <label className="block mb-2 text-black">Subjects:</label>
          <select
            className="p-2  text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select</option>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </form>
      </div>

      <div className="w-full mt-6">
        {students.length > 0 ? (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Student List:
            </h2>
            <hr></hr>

            <div className="overflow-x-auto mt-5 rounded-lg shadow-lg">
              <table className="w-full text-left bg-white text-black rounded-lg shadow-md ">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Seat.No</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...students]
                    .sort((a, b) => a.roll - b.roll)
                    .map((student, index) => {
                      const capitalize = (name) =>
                        name
                          ? name.charAt(0).toUpperCase() + name.slice(1)
                          : "N/A";

                      return (
                        <tr
                          key={index}
                          className="border-b transitio hover:bg-gray-100"
                        >
                          <td className="p-3">
                            {capitalize(student.firstName)}{" "}
                            {capitalize(student.fatherName)}{" "}
                            {capitalize(student.lastName)}
                          </td>
                          <td className="p-3">{student.roll || "N/A"}</td>
                          <td className="p-3 flex gap-5 items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={attendance[student._id] === "Present"}
                                onChange={() =>
                                  handleAttendanceChange(student._id, "Present")
                                }
                                name={`present-${index}`}
                                className="accent-green-500"
                              />
                              <span>Present</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={attendance[student._id] === "Absent"}
                                onChange={() =>
                                  handleAttendanceChange(student._id, "Absent")
                                }
                                name={`absent-${index}`}
                                className="accent-red-500"
                              />
                              <span>Absent</span>
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <button
              className="bg-purple-700 hover:bg-purple-800 w-full h-10 rounded-md mt-4 transition-all duration-200 flex justify-center items-center gap-2"
              onClick={submitAttendance}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Attendance"
              )}
            </button>
          </div>
        ) : (
          <p className="text-gray-400 mt-4 text-center">No students found.</p>
        )}
      </div>

      <ToastContainer />
      <LoadingBar
        color="#ff416c"
        height={3}
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
}

export default Home;
