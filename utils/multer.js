const multer = require('multer');
const path = require("path");


module.exports = multer ({

    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
          if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new Error("File type is not supported"), false);
          return;
        }
        cb(null, true);
      },
})