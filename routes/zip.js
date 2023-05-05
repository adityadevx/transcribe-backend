const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const admzip = require('adm-zip');

//  route for creating zip file
router.get('/', async (req, res) => {
    const zip = new admzip();
    const folderPath = path.join(__dirname, '..', 'download');
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        zip.addLocalFile(path.join(folderPath, file));
    });
    const data = zip.toBuffer();
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=folder.zip');
    res.set('Content-Length', data.length);
    res.end(data, 'binary');
});


module.exports = router;
