const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = "./foto/";
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `img_user-${Date.now()}${path.extname(file.originalname)}`);
    }
});

exports.uploadImage = multer({ storage });