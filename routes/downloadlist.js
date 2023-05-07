const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// this route returns a list of all the files in the download folder to display as a list of files to download

router.get('/', (req, res) => {
    const listFiles = fs.readdirSync(path.join(__dirname, '../download'));
    listFiles.forEach((file, index) => {
        listFiles[index] = file.split('.')[0] + '.mp3';
    });
    res.send(listFiles);
});

module.exports = router;

