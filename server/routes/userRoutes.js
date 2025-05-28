// routes/auth.js
import express from "express";
import {
  fetchAllUsers,
  getRecentUsers,
} from "../controllers/userController.js";

// import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/users", fetchAllUsers);
router.get("/users/recent", getRecentUsers);

export default router;
