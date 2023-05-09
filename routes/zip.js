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

        // console.log(requestedFiles);
        console.log(req.body);


        // Add only the requested files to the zip archive
        req.body.forEach(file => {
            if (files.includes(file)) {
                zip.addLocalFile(path.join(folderPath, file));
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
