import React from "react";

function ModifyStudent({ students, setStudents }) {
  const handleEdit = (student) => {
    // Logic to edit a student
    const updatedName = prompt("Edit Name:", student.name);
    if (updatedName) {
      setStudents(
        students.map((s) =>
          s._id === student._id ? { ...s, name: updatedName } : s
        )
      );
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student._id !== id));
  };

  return (
    <div className="mt-10 mx-auto w-full max-w-4xl">
      <div className="h-14 text-3xl font-bold flex justify-center items-center mb-5">
        Modify Students
      </div>
      {students.length > 0 ? (
        <table className="w-full text-left bg-white text-black rounded-lg shadow-md">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Roll</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.roll}</td>
                <td className="p-3 flex gap-3">
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
      ) : (
        <div className="text-center text-white mt-5">
          No students found. Please add a student.
        </div>
      )}
    </div>
  );
}

export default ModifyStudent;
