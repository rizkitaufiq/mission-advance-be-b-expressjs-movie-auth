const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg', 'image/png', 'image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed : jpeg, jpg, png"), false);
//   }
// };

const upload = multer({
  //   storage: storage,
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  //   fileFilter: fileFilter,
});

module.exports = upload;
