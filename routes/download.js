// const router = require('express').Router();
// const path = require('path');

// const downloadFolder = 'download';

// router.post('/', (req, res) => {
//     const { id } = req.body;
//     const fileName = `${id}`;
//     const filePath = path.join(__dirname, '..', downloadFolder, fileName);
//     res.sendFile(filePath);
// });

// module.exports = router;


const router = require('express').Router();
const path = require('path');
const mime = require('mime-types');

const downloadFolder = 'download';

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const fileName = `${id}`;
    const filePath = path.join(__dirname, '..', downloadFolder, fileName);
    const mimeType = mime.lookup(filePath);
    console.log(mimeType)

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', mimeType);

    res.sendFile(filePath);
});

module.exports = router;
