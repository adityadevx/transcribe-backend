const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const files = fs.readdirSync('./download');
    res.json(files);
});

module.exports = router;