const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  attendance: { type: String, default: "Absent" },
});

module.exports = mongoose.model("Student", StudentSchema);
