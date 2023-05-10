const router = require('express').Router();
const fs = require('fs');
const path = require('path');


router.get('/', async (req, res) => {
    try {
        const API_KEY = await JSON.parse(await fs.promises.readFile(path.join(__dirname, '/key.json'), 'utf8')).key
        res.status(200).json({ key: API_KEY })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;