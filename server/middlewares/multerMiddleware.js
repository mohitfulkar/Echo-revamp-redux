export const multerMiddleware = (err, req, res, next) => {
  if (
    err instanceof multer.MulterError ||
    err.message.includes("Invalid file type")
  ) {
    console.error("Upload error:", err.message);
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
