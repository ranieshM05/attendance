const mongoose = require("mongoose");

const StudentAuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 }, // ✅ Ensure required password
  },
  { timestamps: true }
);

const StudentAuth = mongoose.model("StudentAuth", StudentAuthSchema);
module.exports = StudentAuth;
