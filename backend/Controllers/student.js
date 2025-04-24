const Student = require("../Models/Student");

exports.getStudentsByCourseAndYear = async (req, res) => {
  const { course, year } = req.params;

  try {
    const students = await Student.find({ course, year });

    if (!students.length) {
      return res
        .status(200)
        .json({ message: "No students found", students: [] });
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
