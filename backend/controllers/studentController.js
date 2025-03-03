const Student = require("../models/Students");

// Save student data from Excel to database
const uploadStudents = async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || students.length === 0) {
      return res.status(400).json({ message: "No student data provided." });
    }

    // Insert student data into database
    await Student.insertMany(students, { ordered: false }).catch((err) =>
      console.log("Some duplicate entries were skipped:", err.message)
    );

    res.status(201).json({ message: "Students uploaded successfully!" });
  } catch (error) {
    console.error("Error saving students:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { uploadStudents };
