const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadMiddleware = require("./middleware/upload");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
connectDB();

// Import Routes
const staffRoutes = require("./routes/staffRoutes");
app.use("/api/staff", staffRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
