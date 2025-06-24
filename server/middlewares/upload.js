import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid"; // make sure to install: npm install uuid

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Map field-specific allowed mime types
const fieldMimeTypes = {
  photo: ["image/jpeg", "image/png", "image/webp"],
  identityProof: ["application/pdf", "image/jpeg", "image/png"],
  certification: ["application/pdf", "image/jpeg", "image/png"],
  resume: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  default: ["image/jpeg", "image/png", "image/webp"],
};

// Helper to get allowed types by field
const getAllowedTypes = (fieldname) => {
  return fieldMimeTypes[fieldname] || fieldMimeTypes.default;
};

export const createUploader = (folder = "uploads") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(folder, file.fieldname); // Save under field-specific subfolders
      ensureDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_");
      const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
      const uniqueName = `${baseName}-${file.fieldname}-${uniqueSuffix}${ext}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = getAllowedTypes(file.fieldname);
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type for ${
            file.fieldname
          }. Allowed: ${allowedTypes.join(", ")}`
        ),
        false
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB max per file
    },
  });
};

// Panelist-specific uploader with multiple field support
export const uploadToPanelist = createUploader("uploads/panelists");
export const uploadToCategory = createUploader("uploads/category");
