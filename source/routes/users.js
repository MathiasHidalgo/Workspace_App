const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('Signin fro your account');
})

router.get('/users/signup', (req, res) => {
    res.send('Completing your registration');
})

module.exports = router;