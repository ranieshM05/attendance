const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  attendance: { type: String, enum: ["Present", "Absent"], default: "Absent" },
});

module.exports = mongoose.model("Student", StudentSchema);
