const router = require('express').Router();
require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');

// console.log(token)

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // console.log(process.env.EMAIL, process.env.PASSWORD);
    // console.log(username, password)
    if (email === process.env.EMAIL && password === process.env.PASSWORD) {
        const token = crypto.randomBytes(20).toString('hex');
        fs.writeFileSync('./sessionid.json', JSON.stringify({ token: token }));
        res.status(200).json({ message: 'Login successful', token: token });
    }
    else return res.status(401).json({ message: 'Unauthorized User' });
}
);

module.exports = router;