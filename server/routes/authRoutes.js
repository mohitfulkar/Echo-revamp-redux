// routes/auth.js
import express from "express";
import {
  register,
  verifyOTP,
  resendOTP,
} from "../controllers/authController.js";
import {
  validateOtp,
  validateRegister,
  validateResendOtp,
} from "../middlewares/validators.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/verify-otp", validateOtp, verifyOTP);
router.post("/resend-otp", validateResendOtp, resendOTP);

export default router;
