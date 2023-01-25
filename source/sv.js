// Modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('express-method-override');
const session = require('express-session');

// Initializations
const app = express()

// Settings
const port = app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials')
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret:'workspaceapp',
    resave: true,
    saveUninitialized: true
}))


// Global Variables

// Routes 

// Static Files

// Server is listening 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})