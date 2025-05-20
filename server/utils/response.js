// utils/responseUtils.ts

export const sendResponse = (
  response,
  success = false,
  message = "Action Failed",
  statusCode = 400,
  extraData = {}
) => {
  return response.status(statusCode).json({
    success: success,
    message,
    ...extraData,
  });
};

export const sendServerError = (res, error = "Internal server error") => {
  return res.status(500).json({
    success: false,
    message: error,
  });
};
