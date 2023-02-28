// Modules
const express = require('express');
const path = require('path'); // To navigate trough folders
const exphbs = require('express-handlebars'); // Handlebars module 
const Handlebars = require('handlebars'); 
const methodOverride = require('method-override'); // 
const session = require('express-session');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');


// Initializations
const app = express();
require('./db');

// Settings
app.set('port', process.env.PORT || 3000); // if we receive a port, put it, else use 3000 as port number    

app.set('views', path.join(__dirname, 'views')); // we said that views folder is here in the project

app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})); // app.engine to use handlebars as template for the websie, we specify '.hbs' and then define the variables

app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret:'workspaceapp',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')

    next()
})

// Routes 
app.use(require('./routes/home')); // route to see the home page and the about page
app.use(require('./routes/notes')); // routes to add notes and see them
app.use(require('./routes/users')); // route to register your new username and login if you alredy have one

// Static Files
app.use(express.static(path.join(__dirname, 'public'))); // regardless of the template path, we need to add logic and styles, and we'll store it in public folder accesing to it

// Server is listening 

app.listen(app.get('port'), () => {
    console.log('Server is on port ', app.get('port'));
})
