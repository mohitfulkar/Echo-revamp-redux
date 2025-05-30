// utils/responseUtils.ts

import { HttpStatus } from "../constants/statusCode";

export const sendResponse = (
  response,
  success = false,
  message = "Action Failed",
  statusCode = HttpStatus.BAD_REQUEST,
  extraData = {}
) => {
  return response.status(statusCode).json({
    success: success,
    message,
    ...extraData,
  });
};

export const sendServerError = (res, error = "Internal server error") => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error,
  });
};
