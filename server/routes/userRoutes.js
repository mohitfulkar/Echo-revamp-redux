// routes/auth.js
import express from "express";
import { fetchAllUsers } from "../controllers/userController.js";
const router = express.Router();

router.get("/", fetchAllUsers);

export default router;
