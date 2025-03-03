const mongoose = require("mongoose");

const ODRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reason: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ODRequest", ODRequestSchema);
