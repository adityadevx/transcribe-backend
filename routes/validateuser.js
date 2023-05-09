const router = require('express').Router();
const sessionid = require('../sessionid.json');


router.post('/', (req, res) => {
    const { token } = req.body;
    // console.log(sessionid.token)
    console.log(token);
    if (token === sessionid.token) {
        res.status(200).json({ message: 'Valid User' });
    }
    else return res.status(401).json({ message: 'Unauthorized User' });
})

module.exports = router;
