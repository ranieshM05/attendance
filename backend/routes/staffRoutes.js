const express = require("express");
const { signup, login, getStudents } = require("../controllers/staffController");
const uploadMiddleware = require("../middleware/upload");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/students", getStudents);
router.post("/students/upload", uploadMiddleware.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ message: "Excel data uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
});
  
module.exports = router;
