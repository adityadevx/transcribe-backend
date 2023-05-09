const router = require('express').Router();
const idpass = require('../idpass.json');
const fs = require('fs');
const path = require('path');


router.post('/', (req, res) => {
    const { newPassword } = req.body;
    console.log(newPassword)
    fs.writeFileSync(path.join(__dirname, '../idpass.json'), JSON.stringify({ email: idpass.email, password: newPassword }));
    res.status(200).json({ message: 'Password reset successful' });
})

module.exports = router;