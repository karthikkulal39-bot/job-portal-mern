const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinaryConfig");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("only PDF file is allowed"), false);
  }
};

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits:{fileSize:5*1024*1024}
});

module.exports = uploads;
