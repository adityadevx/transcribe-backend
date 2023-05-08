const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    console.log(req.body);
    try {
        // const { files } = req.body;
        // console.log(files);
        req.body.forEach(file => {
            fs.unlink(path.join(__dirname, `../download/${file}`), (err) => {
                if (err) return res.status(500).json({ message: 'Internal server error' });
                console.log(`${file} was deleted`);
            });
        });
        res.status(200).json({ message: 'Files deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;
