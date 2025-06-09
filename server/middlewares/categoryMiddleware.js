import { check, validationResult } from "express-validator";

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
// Validation middleware
export const validateCategory = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  check("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description can't exceed 200 characters"),

  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

export const validateCategoryCreation = validate(validateCategory);
