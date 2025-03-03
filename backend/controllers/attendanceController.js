const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const attendance = new Attendance({ studentId, status, date: new Date().toISOString().split("T")[0] });
    await attendance.save();
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get Attendance by Student ID
const getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Save Bulk Student Data
const uploadStudents = async (req, res) => {
  try {
    const students = req.body.students; // Expecting an array of students
    await Attendance.insertMany(students);
    res.json({ message: "Student data uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload students" });
  }
};

module.exports = { markAttendance, getAttendance, uploadStudents };
