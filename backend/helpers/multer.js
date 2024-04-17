const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only png,jpg and webp are supported");
      callback(null, false);
    }
  },
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
});
module.exports = upload;
