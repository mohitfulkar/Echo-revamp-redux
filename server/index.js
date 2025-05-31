import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { HttpStatus } from "./constants/statusCode.js";

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongodb.uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/poll", pollRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Server error",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
