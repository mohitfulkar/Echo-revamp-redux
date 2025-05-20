// routes/auth.js
import express from "express";
import {
  loginUser,
  register,
  verifyOTP,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateOtp,
  validateRegister,
} from "../middlewares/validators.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/verify-otp", validateOtp, verifyOTP);
router.post("/login", validateLogin, loginUser);

export default router;
