const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");
const { getStudentsByCourseAndYear } = require("../Controllers/student");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ Add a student
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("Update Data:", req.body);

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/course/:course/year/:year", getStudentsByCourseAndYear);

module.exports = router;
