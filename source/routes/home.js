const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // home.hbs is on views folder
})

router.get('/about', (req, res) => {
    res.render('about'); // the same with about.hbs
})

module.exports = router;