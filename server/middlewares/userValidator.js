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

const validateFileUpload = (fieldName, required = true) => {
  return (req, res, next) => {
    const files = req.files;

    const isMissingOrEmpty =
      !files || !files[fieldName] || files[fieldName].length === 0;

    if (required && isMissingOrEmpty) {
      req.validationErrors = req.validationErrors || [];
      req.validationErrors.push({
        type: "field",
        msg: `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`,
        path: fieldName,
        location: "files",
      });
    }
    next();
  };
};

export const validateCreatePanelist = [
  // Personal Details
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

  check("password").notEmpty().withMessage("Password is required"),

  // Social Media (all optional but must be valid URLs if present)
  check("linkedIn").optional().isURL().withMessage("Invalid LinkedIn URL"),

  check("twitter").optional().isURL().withMessage("Invalid Twitter URL"),

  check("github").optional().isURL().withMessage("Invalid GitHub URL"),

  check("website").optional().isURL().withMessage("Invalid Website URL"),

  check("otherSocialMedia")
    .optional()
    .isURL()
    .withMessage("Invalid Other Social Media URL"),

  // Profession
  check("occupation").notEmpty().withMessage("Occupation is required"),

  check("areaOfExpertise")
    .isArray({ min: 1 })
    .withMessage("At least one area of expertise is required"),

  check("yearsOfExperience")
    .notEmpty()
    .withMessage("Years of experience is required")
    .isNumeric()
    .withMessage("Years of experience must be a number"),

  // Contribution
  check("contributionSummary")
    .notEmpty()
    .withMessage("Contribution summary is required"),

  check("publications")
    .optional()
    .isString()
    .withMessage("Publications must be a string"),

  check("awards").optional().isString().withMessage("Awards must be a string"),

  // Designation
  check("assignedCategory")
    .notEmpty()
    .withMessage("Assign Category is required"),

  check("designationTitle")
    .notEmpty()
    .withMessage("Designation Title is required"),

  check("assignedBy").notEmpty().withMessage("Assigned By is required"),

  check("areaOfResponsibility")
    .optional()
    .isArray()
    .withMessage("Area of Responsibility must be an array"),

  // Uploads – just check for existence (actual file type/size should be handled by multer or client)
  validateFileUpload("photo", true),
  validateFileUpload("identityProof", true),
  validateFileUpload("resume", false),
  validateFileUpload("certification", false), // Optional
];

export const validateSuperPanelist = [
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
export const validateSuperPanelistCreation = validate(validateSuperPanelist);
