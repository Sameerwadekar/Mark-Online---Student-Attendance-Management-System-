const Attendance = require("../Models/Attendance");
const Student = require("../Models/Student");
const { markStudentEmail } = require("../helpers/markStudentEmail");

const sendMail = require("../helpers/sendMail");

exports.markAttendance = async (req, res) => {
  const { attendanceData, date, subject, semester } = req.body;

  try {
    const formattedDate = new Date(date).toISOString().slice(0, 10);

    const firstStudentId = Object.keys(attendanceData)[0];
    const firstStudent = await Student.findById(firstStudentId);
    if (!firstStudent) {
      return res.status(404).json({ message: "No valid student found" });
    }
    const course = firstStudent.course;

    const studentsArray = await Promise.all(
      Object.entries(attendanceData).map(async ([studentId, status]) => {
        const student = await Student.findById(studentId);
        if (!student) return null;
        return {
          roll: student.roll,
          name: `${student.firstName} ${student.lastName}`,
          status,
          email: student.email,
        };
      })
    );

    const students = studentsArray.filter((s) => s !== null);

    let attendanceRecord = await Attendance.findOne({
      date: formattedDate,
      course,
      subject,
      semester,
    });

    if (attendanceRecord) {
      attendanceRecord.students = students;
      await attendanceRecord.save();
    } else {
      attendanceRecord = await Attendance.create({
        date: formattedDate,
        course,
        subject,
        semester,
        students,
      });
    }
    const presentStudents = students.filter((s) => s.status === "Present");

    for (const student of presentStudents) {
      if (!student.email) {
        console.error(
          `Skipping email for ${student.name} as no email is provided.`
        );
        continue;
      }

      await sendMail(
        student.email,
        "Attendance Update 📅",
        `Hi ${student.name}, Your attendance for ${subject} on ${formattedDate} is marked as ${student.status}.`,
        markStudentEmail(student, subject, formattedDate, student.status) // Pass subject, date, and status
      );
    }

    res
      .status(201)
      .json({ message: "Attendance marked successfully & emails sent!" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

// Fetch Attendance Records
exports.getAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records", error });
  }
};
