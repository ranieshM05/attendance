const express = require("express");
const { markAttendance, getAttendance, uploadStudents } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/mark", markAttendance);  // Mark attendance
router.get("/:studentId", getAttendance);  // Get student attendance
router.post("/upload", uploadStudents);  // Upload students from Excel

module.exports = router;
