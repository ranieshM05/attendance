const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    rollNumber: { type: String, required: true, unique: true }, 
    attendance: [
      {
        date: { type: Date, default: Date.now }, // 📅 Store attendance dates
        status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
      },
    ],
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// 🔹 Method to compare passwords
StudentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
