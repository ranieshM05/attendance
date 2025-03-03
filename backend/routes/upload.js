const express = require("express");
const multer = require("multer");
const Student = require("../models/Student");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer.toString("utf-8");
    const studentData = JSON.parse(fileBuffer); // Convert Excel data to JSON

    await Student.insertMany(studentData);
    res.status(200).json({ message: "Students uploaded successfully" });
  } catch (error) {
    console.error("Error uploading students", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
