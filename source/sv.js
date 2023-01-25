// Modules
const express = require('express');
const path = require('path');

// Initializations
const app = express()

// Settings
const port = app.set('port', process.env.PORT || 3000);
// Middlewares

// Global Variables

// Routes 

// Static Files

// Server is listening 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})