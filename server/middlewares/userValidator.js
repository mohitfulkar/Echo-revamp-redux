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

export const validateCreatePanelist = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("contactNumber")
    .notEmpty()
    .withMessage("Contact number is required")
    .isMobilePhone()
    .withMessage("Invalid contact number"),

  check("occupation").notEmpty().withMessage("Occupation is required"),

  check("areaOfExpertise")
    .isArray({ min: 1 })
    .withMessage("At least one area of expertise is required"),

  check("contributionSummary")
    .notEmpty()
    .withMessage("Contribution summary is required"),

  check("excellenceRating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Excellence rating must be between 0 and 10"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  check("authorizedToCreatePolls")
    .optional()
    .isBoolean()
    .withMessage("authorizedToCreatePolls must be a boolean"),

  // Optional social media URLs
  check("socialMedia.linkedIn")
    .optional()
    .isURL()
    .withMessage("Invalid LinkedIn URL"),

  check("socialMedia.twitter")
    .optional()
    .isURL()
    .withMessage("Invalid Twitter URL"),

  check("socialMedia.github")
    .optional()
    .isURL()
    .withMessage("Invalid GitHub URL"),

  check("socialMedia.website")
    .optional()
    .isURL()
    .withMessage("Invalid website URL"),
  check("password", "Password is required").not().isEmpty(),
];

export const validateSuperPanelistCreatePanelist = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("contactNumber")
    .notEmpty()
    .withMessage("Contact number is required")
    .isMobilePhone()
    .withMessage("Invalid contact number"),

  check("occupation").notEmpty().withMessage("Occupation is required"),

  check("areaOfExpertise")
    .notEmpty()
    .withMessage("Area of expertise is required"),

  check("contributionSummary")
    .notEmpty()
    .withMessage("Contribution summary is required"),

  check("excellenceRating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Excellence rating must be between 0 and 10"),

  // Optional social media URLs
  check("socialMedia.linkedIn")
    .optional()
    .isURL()
    .withMessage("Invalid LinkedIn URL"),

  check("socialMedia.twitter")
    .optional()
    .isURL()
    .withMessage("Invalid Twitter URL"),

  check("socialMedia.github")
    .optional()
    .isURL()
    .withMessage("Invalid GitHub URL"),

  check("socialMedia.website")
    .optional()
    .isURL()
    .withMessage("Invalid website URL"),

  check("password", "Password is required").not().isEmpty(),
];

export const validatePanelistCreation = validate(validateCreatePanelist);
export const validateSuperPanelistCreation = validate(
  validateSuperPanelistCreatePanelist
);
