// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOTPEmail } from "../services/emailService.js";
import { sendResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
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
      return sendResponse(res, false, "Passwords do not match", 400, false);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return sendResponse(
        res,
        false,
        "User already exists with this email",
        400,
        false
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    await Otp.findOneAndUpdate(
      { email },
      { email, fullName, hashedPassword, otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, fullName, otp);

    return sendResponse(
      res,
      true,
      "OTP sent. Please check your email for OTP verification.",
      200,
      true,
      { data: { email } }
    );
  } catch (error) {
    return sendResponse(
      res,
      false,
      "Server error during registration",
      500,
      false
    );
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
      return sendResponse(
        res,
        false,
        "OTP expired or invalid. Please register again.",
        400,
        false
      );
    }

    if (otpRecord.otp !== otp) {
      return sendResponse(
        res,
        false,
        "Invalid OTP. Please try again.",
        400,
        false
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return sendResponse(
        res,
        false,
        "OTP has expired. Please register again.",
        400,
        false
      );
    }

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return sendResponse(
        res,
        false,
        "Email already registered and verified",
        400,
        false
      );
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

    return sendResponse(
      res,
      true,
      "Email verified successfully. You can now login.",
      200,
      true,
      {
        data: { email },
      }
    );
  } catch (error) {
    return sendResponse(
      res,
      false,
      "Server error during verification",
      500,
      false
    );
  }
};

//user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`[Login] Attempting login for email: ${email}`);

    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      console.warn(`[Login] No user found with email: ${email}`);
      return sendResponse(
        res,
        false,
        "Invalid credentials or user not verified",
        401,
        false
      );
    }

    if (!user.isVerified) {
      console.warn(`[Login] User not verified: ${email}`);
      return sendResponse(
        res,
        false,
        "Invalid credentials or user not verified",
        401,
        false
      );
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`[Login] Password match status for ${email}:`, isMatch);

    if (!isMatch) {
      console.warn(`[Login] Incorrect password for email: ${email}`);
      return sendResponse(res, false, "Invalid email or password", 400, false);
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    console.log(`[Login] Login successful for ${email}. Token generated.`);

    return sendResponse(res, true, "Login successful", 200, {
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: "user",
        },
      },
    });
  } catch (error) {
    console.error("[Login] Error during login:", error);
    return sendResponse(res, false, "Server error during login", 500, false);
  }
};
