// routes/auth.js
import express from "express";
import {
  loginUser,
  panelistLogin,
  register,
  superPanelistLogin,
  verifyOTP,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateOtp,
  validatePanelistLogin,
  validateRegister,
} from "../middlewares/validators.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/verify-otp", validateOtp, verifyOTP);
router.post("/login", validateLogin, loginUser);
router.post("/panelist/login", validatePanelistLogin, panelistLogin);
router.post("/super-panelist/login", validateLogin, superPanelistLogin);

export default router;
