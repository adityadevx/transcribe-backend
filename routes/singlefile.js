const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// console.log(req.query.filename);
router.get('/', async (req, res) => {
    try {
        const downloadFolder = 'download';
        const fileName = req.query.filename.split('.')[0] + '.txt';
        const filePath = path.join(__dirname, '..', downloadFolder, fileName);
        const mimeType = mime.lookup(filePath);
        // console.log(mimeType)

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', mimeType);

        res.sendFile(filePath);
    } catch (error) {
        console.log(error).message;
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;

