// middleware/validators.js (extend this file)

import { check, body } from "express-validator";
import { validationResult } from "express-validator";

/**
 * Generic validate wrapper (already defined by you)
 */
const validate = (validationRules) => {
  return [
    ...validationRules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

/**
 * Validation rules for creating a poll
 */
const createPollRules = [
  check("title", "Poll title is required").notEmpty().trim(),

  check("questions", "At least one question is required")
    .isArray({ min: 1 })
    .custom((questions) => {
      for (const question of questions) {
        if (!question.text || typeof question.text !== "string") {
          throw new Error('Each question must have a valid "text" field');
        }

        if (!["single", "multiple"].includes(question.type)) {
          throw new Error(
            'Each question must have a valid "type" ("single" or "multiple")'
          );
        }

        if (!Array.isArray(question.options) || question.options.length < 2) {
          throw new Error("Each question must have at least two options");
        }

        for (const option of question.options) {
          if (!option.text || typeof option.text !== "string") {
            throw new Error('Each option must have a valid "text"');
          }
        }
      }

      return true;
    }),

  check("createdBy", "CreatedBy must be a valid Mongo ID").isMongoId(),

  body("status")
    .optional()
    .isIn(["active", "inactive", "closed"])
    .withMessage("Invalid poll status"),
];

// Export the middleware
export const validateCreatePoll = validate(createPollRules);
