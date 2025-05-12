// controllers/authController.js
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOTPEmail } from "../services/emailService.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const OTP_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Register controller
 */
export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    const otpRecord = await Otp.findOneAndUpdate(
      { email },
      { email, fullName, hashedPassword, otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, fullName, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent. Please check your email for OTP verification.",
      data: { email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};
``;
/**
 * Verify OTP controller
 */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or invalid. Please register again.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already registered and verified",
      });
    }

    if (user) {
      user.fullName = otpRecord.fullName;
      user.password = otpRecord.hashedPassword;
      user.isVerified = true;
      await user.save();
    } else {
      user = new User({
        fullName: otpRecord.fullName,
        email: otpRecord.email,
        password: otpRecord.hashedPassword,
        isVerified: true,
      });
      await user.save();
    }

    await Otp.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
      data: { email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
};

/**
 * Resend OTP controller
 */
export const resendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Registration session expired. Please register again.",
      });
    }

    const newOtp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    otpRecord.otp = newOtp;
    otpRecord.expiresAt = expiresAt;
    await otpRecord.save();

    await sendOTPEmail(email, otpRecord.fullName, newOtp);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully. Please check your email.",
      data: { email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error while resending OTP" });
  }
};
