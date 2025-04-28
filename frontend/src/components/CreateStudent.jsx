import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import { BsFilterLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineArrowDropDownCircle, MdMenu } from "react-icons/md";
import LoadingBar from "react-top-loading-bar";

function CreateStudent() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    roll: "",
    course: "",
    phone: "",
    address: "",
    year: "",
  });

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/students`);
      if (!response.ok) throw new handleError("Failed to fetch students");

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      handleError("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      email: "",
      roll: "",
      course: "",
      phone: "",
      address: "",
      year: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editId) {
        response = await fetch(`http://localhost:5000/api/students/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch("http://localhost:5000/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      handleSuccess("Student Created");

      if (!response.ok) {
        throw new handleError(`HTTP error! status: ${response.status}`);
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      handleError("All Fields Are Reuired");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new handleError(`HTTP error! status: ${response.status}`);
      }

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
      handleSuccess("Deleted Succesfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student._id);
  };

  const filteredStudents = students.filter((student) => {
    return (
      (selectedCourse === "" || student.course === selectedCourse) &&
      (selectedYear === "" || student.year === selectedYear)
    );
  });

  return (
    <>
      <div className="flex flex-col text-white p-5">
        <div className="relative text-2xl font-bold flex justify-between items-center px-4 py-2 lg:px-10">
          <div>{editId ? "Edit Student" : "Student Registration Form"}</div>

          <div
            className="mt-1 cursor-pointer relative flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h6 className="hidden sm:block text-xl">Hello, Admin👋</h6>
            <MdOutlineArrowDropDownCircle className="text-3xl sm:text-2xl ml-2" />

            {isOpen && (
              <button
                className="absolute right-0 mt-12 text-white text-sm font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 w-32 h-8 shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => navigate("/signup"), 1000);
                }}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
        <hr className="mt-3"></hr>

        <div className="flex flex-col items-center mt-7 ">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black p-6 rou nded-lg  w-full max-w-2xl rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Student Information</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1">Student ID</label>
                <input
                  type="number"
                  name="roll"
                  value={formData.roll}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  <option value="Bcom">Bcom</option>
                  <option value="BMM">BMM</option>
                  <option value="Baf">Baf</option>
                  <option value="Bsc">Bsc</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white py-3 px-6 rounded-md hover:bg-purple-800 transition-all w-full"
            >
              {editId ? "Update Student" : "Submit"}
            </button>
          </form>
        </div>
        <div className="flex justify-between py-1 mt-8 px-7 relative">
          <h1 className="text-2xl px-2 font-bold">List Of Students</h1>
          <div className="relative">
            <BsFilterLeft
              className="text-2xl mt-3 cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            />
            {showFilter && (
              <div className="absolute right-0 bg-white text-black shadow-lg p-4 m-12 rounded-md min-h-[220px] w-80 ">
                <label className="block mb-2">Filter by Course:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="p-2 border rounded-md w-full mb-3"
                >
                  <option value="">All</option>
                  <option value="Bcom">Bcom</option>
                  <option value="BMM">BMM</option>
                  <option value="Baf">Baf</option>
                  <option value="Bsc">Bsc</option>
                </select>

                <label className="block mb-2">Filter by Year:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="">All</option>
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <hr></hr>
        {students.length > 0 ? (
          <div className="overflow-x-auto mt-5">
            <table className="w-full text-left bg-white text-black rounded-lg shadow-md">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      {student.firstName?.charAt(0).toUpperCase() +
                        student.firstName?.slice(1) || "N/A"}{" "}
                      {student.fatherName?.charAt(0).toUpperCase() +
                        student.fatherName?.slice(1) || "N/A"}{" "}
                      {student.lastName?.charAt(0).toUpperCase() +
                        student.lastName?.slice(1) || "N/A"}
                    </td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.roll}</td>
                    <td className="p-3">
                      {student.year}
                      {student.course}
                    </td>
                    <td className="p-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-white mt-5">
            No students found. Please add a student.
          </div>
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
    </>
  );
}

export default CreateStudent;
