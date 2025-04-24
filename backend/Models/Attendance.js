const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: { type: Date, required: true },
  course: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: String, required: true },
  students: [
    {
      roll: { type: Number, required: true },
      name: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
