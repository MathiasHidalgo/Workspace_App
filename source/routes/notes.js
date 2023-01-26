const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('notes from the db of your account');
})

module.exports = router;