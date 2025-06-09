import multer from "multer";
import path from "path";
import fs from "fs";

// Create directory if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const createUploader = (folder = "uploads") => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(folder);
      ensureDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 2MB
  });
};

export const uploadToPanelist = createUploader("uploads/panelists");
export const  uploadToCategory= createUploader("uploads/category");
