const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Student = require("../models/Students");

const router = express.Router();

// Multer Storage: Uploads files to memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload and Save Excel File Data to MongoDB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Parse the uploaded Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Transform data into student objects
    const students = data.map((student) => ({
      name: student.Name,
      email: student.Email,
      rollNumber: student.RollNumber,
      attendance: student.Attendance === "Present" ? "Present" : "Absent",
    }));

    for (const student of students) {
      await Student.findOneAndUpdate(
        { email: student.email }, // Find student by email
        { $set: student }, // Update their details if found
        { upsert: true, new: true } // Insert if not found
      );
    }

    res.status(201).json({ message: "Students uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading students:", error);
    res.status(500).json({ error: "Failed to upload students." });
  }
});

// ✅ Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

module.exports = router;
