const express = require("express");
const router = express.Router();
const Student = require("../models/Students"); // ✅ Corrected Model Import

// 📌 Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📌 Fetch a single student by email (For login & dashboard)
router.get("/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📌 Student Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login successful", token: "fake-jwt-token", student });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// 📌 Student Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, rollNumber } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const newStudent = new Student({ name, email, password, rollNumber });
    await newStudent.save();

    res.status(201).json({ success: true, message: "Signup successful", student: newStudent });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// 📌 Upload multiple students from Excel
router.post("/upload", async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || students.length === 0) {
      return res.status(400).json({ message: "No student data provided" });
    }

    await Student.insertMany(students);
    res.status(201).json({ message: "Students uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📌 Update attendance for multiple students (Optimized)
router.put("/update", async (req, res) => {
  try {
    const { updates } = req.body;

    if (!updates || updates.length === 0) {
      return res.status(400).json({ message: "No attendance updates provided" });
    }

    // ✅ Bulk update using `updateMany`
    const updateOperations = updates.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $set: { attendance: update.attendance } }
      }
    }));

    await Student.bulkWrite(updateOperations);

    res.status(200).json({ message: "Attendance updated successfully!" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📌 Delete a Student by Email
router.delete("/:email", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ email: req.params.email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
