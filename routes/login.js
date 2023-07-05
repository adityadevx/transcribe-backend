const router = require('express').Router();
require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// console.log(token)
// const idpass = require(__dirname + '/idpass.json');
router.post('/', async (req, res) => {

    const idpass1 = await fs.promises.readFile(__dirname + '/idpass.json');
    const idpass = JSON.parse(idpass1)
    //  const idpass = require(__dirname + '/idpass.json');
    const { email, password } = req.body;
    console.log(process.env.EMAIL, process.env.PASSWORD, 'process.env.EMAIL, process.env.PASSWORD');

    // console.log(email, password ,'req.body')
    if (email === idpass.email && password === idpass.password) {
        const token = crypto.randomBytes(20).toString('hex');
        fs.writeFileSync(path.join(__dirname, '/sessionid.json'), JSON.stringify({ token: token }));
        res.status(200).json({ message: 'Login successful', token: token });
    }
    else return res.status(401).json({ message: 'Unauthorized User' });
}
);

module.exports = router;

