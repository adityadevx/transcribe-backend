const router = require('express').Router();
const fs = require('fs');

router.post('/', async (req, res) => {
    try {
        const { newApiKey } = req.body;
        // const previousApiKey = await fs.promises.readFile(__dirname + '/key.json', 'utf8');
        await fs.promises.writeFile(__dirname + '/key.json', JSON.stringify({ key: newApiKey }), 'utf8');
        res.status(200).json({ message: 'Key reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }

});


module.exports = router;