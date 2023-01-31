const express = require('express');
const router = express.Router();


router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
})

router.post('/notes/new-note', (req, res) => {
    console.log(req.body);
    res.send('ok');
})

router.get('/notes', (req, res) => {
    res.send('notes from the db of your account');
})

module.exports = router;