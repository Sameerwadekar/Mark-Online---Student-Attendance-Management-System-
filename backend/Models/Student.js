const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roll: { type: Number, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  course: { type: String, required: true },
  address: { type: String, required: true },
  year: { type: String, required: true },
});
StudentSchema.index({ roll: 1, course: 1, year: 1 }, { unique: true });
module.exports = mongoose.model("Student", StudentSchema);
