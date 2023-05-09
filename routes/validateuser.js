const router = require('express').Router();


router.post('/', (req, res) => {
    const { token } = req.body;
    const sessionid = require(__dirname + '/sessionid.json');
    // console.log(sessionid.token)
    console.log(token, 'token');
    if (token === sessionid.token) {
        res.status(200).json({ message: 'Valid User' });
    }
    else return res.status(401).json({ message: 'Unauthorized User' });
})

module.exports = router;
