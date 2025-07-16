// uploadMiddleware.js
import multer from "multer";

// In-memory storage
const storage = multer.memoryStorage();

export const multiFieldUpload = (fields) => {
  return multer({ storage }).fields(fields);
};
