import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure Upload Directory Exists
const createUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Define Storage for Profile Picture & Resume
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "public/uploads";

    if (file.mimetype.startsWith("image/")) {
      uploadPath += "/profilePictures";
    } else if (file.mimetype === "application/pdf") {
      uploadPath += "/resumes";
    }

    createUploadDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File Filter (Only Image & PDF)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed!"), false);
  }
};

// Multer Middleware (Profile & Resume)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
});

const uploadMiddleware = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resumeUrl", maxCount: 1 },
]);

export { uploadMiddleware };

