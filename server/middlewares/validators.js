// middleware/validators.js

import { check, validationResult } from "express-validator";
import { HttpStatus } from "../constants/statusCode.js";

/**
 * Function to validate request and return errors if any
 * @param {Array} validationRules - Array of express-validator rules
 * @returns {Array} - Array of middleware functions
 */
const validate = (validationRules) => {
  return [
    // Apply all validation rules
    ...validationRules,
    // Handle validation results
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

/**
 * Validation rules for user registration
 */
const registerRules = [
  check("fullName", "Full name is required").not().isEmpty().trim(),

  check("email", "Please include a valid email").isEmail().normalizeEmail(),

  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),

  check("confirmPassword", "Confirm password is required")
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];


const otpRules = [
  check("email", "Please include a valid email").isEmail().normalizeEmail(),

  check("otp", "OTP is required")
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be exactly 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
];

const resendOtpRules = [
  check("email", "Please include a valid email").isEmail().normalizeEmail(),
];

const loginRules = [
  check("email", "Please include a valid email").isEmail().normalizeEmail(),

  check("password", "Password is required").not().isEmpty(),
];

const resetPasswordRequestRules = [
  check("email", "Please include a valid email").isEmail().normalizeEmail(),
];

const resetPasswordRules = [
  check("token", "Reset token is required").not().isEmpty(),

  check("password", "Password must be at least 6 characters")
    .isLength({ min: 6 })
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  check("confirmPassword", "Confirm password is required")
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];

// Export all validation middleware
export const validateRegister = validate(registerRules);
export const validateOtp = validate(otpRules);
export const validateResendOtp = validate(resendOtpRules);
export const validateLogin = validate(loginRules);
export const validateResetPasswordRequest = validate(resetPasswordRequestRules);
export const validateResetPassword = validate(resetPasswordRules);
