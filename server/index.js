import express from "express";
import cors from "cors";
import allRoutes from "./routes/routes.js";
import { logger } from "./middlewares/logger.js";
import connectDB from "./database/db.js";
import http from "http";
import { multerMiddleware } from "./middlewares/multerMiddleware.js";
import { initSocket } from "./socket/index.js";

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = initSocket(server);
app.set("io", io); // make accessible in controllers
// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(multerMiddleware);

app.use("/uploads", express.static("uploads"));

// Routes
app.use(allRoutes);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
