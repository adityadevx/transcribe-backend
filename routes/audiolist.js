const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {

    try {
        const uploadedFiles = await fs.readdirSync(path.join(__dirname, '../uploads'));
        res.json(uploadedFiles);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});




module.exports = router;