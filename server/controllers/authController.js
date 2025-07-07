// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOTPEmail } from "../services/emailService.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../constants/statusCode.js";
import Panelist from "../models/Panelist.js";
import Category from "../models/Category.js";
import SuperPanelist from "../models/SuperPanelist.js";
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
      return sendResponse(
        res,
        false,
        "Passwords do not match",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return sendResponse(
        res,
        false,
        "User already exists with this email",
        HttpStatus.BAD_REQUEST,
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
      HttpStatus.OK,
      true,
      { data: { email } }
    );
  } catch (error) {
    sendServerError(res, "Server error during registration");
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return sendResponse(
        res,
        false,
        "OTP expired or invalid. Please register again.",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    if (otpRecord.otp !== otp) {
      return sendResponse(
        res,
        false,
        "Invalid OTP. Please try again.",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return sendResponse(
        res,
        false,
        "OTP has expired. Please register again.",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return sendResponse(
        res,
        false,
        "Email already registered and verified",
        HttpStatus.BAD_REQUEST,
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
      HttpStatus.OK,
      true,
      {
        data: { email },
      }
    );
  } catch (error) {
    sendServerError(res, "Server error during verification");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      console.warn(`[Login] No user found with email: ${email}`);
      return sendResponse(
        res,
        false,
        "Invalid credentials or user not verified",
        HttpStatus.UNAUTHORIZED,
        false
      );
    }

    if (!user.isVerified) {
      console.warn(`[Login] User not verified: ${email}`);
      return sendResponse(
        res,
        false,
        "Invalid credentials or user not verified",
        HttpStatus.UNAUTHORIZED,
        false
      );
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`[Login] Password match status for ${email}:`, isMatch);

    if (!isMatch) {
      console.warn(`[Login] Incorrect password for email: ${email}`);
      return sendResponse(
        res,
        false,
        "Invalid email or password",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    sendResponse(res, true, "Login successful", HttpStatus.OK, {
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
    console.error(" Error during login:", error);
    sendServerError(res);
  }
};

export const panelistLogin = async (req, res) => {
  try {
    const { categoryId, email, password } = req.body;

    // Find panelist by email AND categoryId
    const panelist = await Panelist.findOne({ email });
    if (!panelist) {
      return sendResponse(
        res,
        false,
        "Panelist not found",
        HttpStatus.NOT_FOUND
      );
    }

    // 2. Check if the categoryId matches the panelist's assigned category
    if (String(panelist.assignedCategory) !== String(categoryId)) {
      return sendResponse(
        res,
        false,
        "Panelist does not belong to the selected category",
        HttpStatus.BAD_REQUEST
      );
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendResponse(res, false, "Category not found", 404);
    }
    console.log("panelist", panelist);
    console.log("category", category);

    if (!panelist || !category) {
      return sendResponse(
        res,
        false,
        "Panelist or Category not found or mismatched",
        HttpStatus.UNAUTHORIZED,
        false
      );
    }

    const isMatch = bcrypt.compare(password, panelist.password);
    if (!isMatch) {
      return sendResponse(
        res,
        false,
        "Invalid email or password",
        HttpStatus.BAD_REQUEST,
        false
      );
    }
    const token = jwt.sign(
      { id: panelist._id, email: panelist.email, category: categoryId },
      process.env.JWT_SE_PANELIST || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    return sendResponse(res, true, "Login successful", HttpStatus.OK, {
      data: {
        token,
        user: {
          id: panelist._id,
          fullName: panelist.fullName,
          email: panelist.email,
          role: "panelist",
          categoryId,
          categoryName: category.name,
        },
      },
    });
  } catch (error) {
    console.error("Panelist login error:", error);
    return sendServerError(res);
  }
};
export const superPanelistLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find panelist by email AND categoryId
    const sPanelist = await SuperPanelist.findOne({ email });
    if (!sPanelist) {
      return sendResponse(
        res,
        false,
        "Super Panelist not found",
        HttpStatus.NOT_FOUND
      );
    }

    const isMatch = bcrypt.compare(password, sPanelist.password);
    if (!isMatch) {
      return sendResponse(
        res,
        false,
        "Invalid email or password",
        HttpStatus.BAD_REQUEST,
        false
      );
    }

    const token = jwt.sign(
      { id: sPanelist._id, email: sPanelist.email },
      process.env.JWT_SECRET_SUPER_PANELIST || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    return sendResponse(res, true, "Login successful", HttpStatus.OK, {
      token,
      user: {
        id: sPanelist._id,
        fullName: sPanelist.fullName,
        email: sPanelist.email,
        role: "super-panelist",
      },
    });
  } catch (error) {
    console.error("Super Panelist login error:", error);
    return sendServerError(res);
  }
};
