const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const admzip = require('adm-zip');

router.post('/', async (req, res) => {
    try {
        const zip = new admzip();
        const folderPath = path.join(__dirname, '..', 'download');
        const files = fs.readdirSync(folderPath);

        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).send('Invalid request. Please provide an array of file IDs.');
        }

        req.body.forEach((file) => {
            const fileId = file.id + '.txt';
            const filename = file.value + '.txt';
            if (files.includes(fileId)) {
                // zip.addLocalFile(path.join(folderPath, fileId));
                zip.addLocalFile(path.join(folderPath, fileId), '', filename);
            } else {
                console.warn(`File with ID ${fileId} not found.`);
            }
        });

        const data = zip.toBuffer();
        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', 'attachment; filename=TranscribeFiles.zip');
        res.set('Content-Length', data.length);
        res.end(data, 'binary');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
