import express from "express";
import bodyParser from "body-parser"; // If you're using body-parser
import cors from "cors";
import pollRoutes from "./routes/pollRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import panelistRoutes from "./routes/panelistRoute.js";
import mailRoutes from "./routes/mailRoutes.js";
const PORT = 3000;
const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" })); // Example: 10 MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static("uploads"));

const routes = [pollRoutes, userRoutes, panelistRoutes, mailRoutes];
routes.forEach((route) => {
  app.use("/", route);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
