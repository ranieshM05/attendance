const express = require("express");
const { register, login } = require("../controllers/authController"); // Import controllers

const router = express.Router();

// ✅ Signup Route (Saves user to the database)
router.post("/signup", register);

// ✅ Login Route (Fetch user from DB and validate)
router.post("/login", login);

module.exports = router;
