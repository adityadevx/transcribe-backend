const router = require('express').Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB file size limit
});

router.post('/', upload.array('files', 50), (req, res) => {
    res.status(200).json({ message: 'Upload successful' });
});

module.exports = router;
