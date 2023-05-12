const router = require('express').Router();
const fs = require('fs');
const path = require('path');


router.get('/', async (req, res) => {

    try {
        const { filename } = req.query;
        // console.log(filename);
        // const uploadsFolder = path.join(__dirname, '../uploads');
        // const filePath = path.join(uploadsFolder, filename);
        fs.unlink(path.join(__dirname, `../uploads/${filename}`), (err) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });
            console.log(`${filename} was deleted`);
        });
        res.status(200).json({ message: 'File deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;
