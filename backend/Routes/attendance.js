const express = require("express");
const {
  markAttendance,
  getAttendanceRecords,
} = require("../Controllers/attendance");
const router = express.Router();

router.post("/mark", markAttendance);
// router.get("/classwise/:classname", getClassWiseAttendance);
router.get("/records", getAttendanceRecords);

module.exports = router;
