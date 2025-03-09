const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Student = require("../models/Students"); // Student details model
const StudentAuth = require("../models/StudentAuth"); // Auth model

// 🔹 Student Login Route
router.post("/login", async (req, res) => {
  console.log("📥 Incoming login request:", req.body); // Debugging

  try {
    const { email, password } = req.body;

    // ✅ Check if email and password are provided
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // ✅ Find student in StudentAuth collection (for login credentials)
    const studentAuth = await StudentAuth.findOne({ email });
    console.log("🔍 StudentAuth result:", studentAuth);

    if (!studentAuth) {
      console.log("❌ No account found for this email:", email);
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, studentAuth.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Retrieve full student details from Students collection
    const studentDetails = await Student.findOne({ email });
    console.log("🔍 Student details result:", studentDetails);

    if (!studentDetails) {
      console.log("❌ Student details not found for:", email);
      return res.status(400).json({ success: false, message: "Student details not found" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: studentDetails._id, email: studentDetails.email, role: "student" },
      "your_jwt_secret", // 🔹 Change this to an environment variable
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful for:", email);
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      student: {
        id: studentDetails._id,
        name: studentDetails.name,
        email: studentDetails.email,
        rollNumber: studentDetails.rollNumber,
      }
    });

  } catch (error) {
    console.error("🚨 Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

module.exports = router;
