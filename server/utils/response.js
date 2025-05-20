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
