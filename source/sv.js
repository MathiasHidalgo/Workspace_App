// Modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Initializations
const app = express()

// Settings
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
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
app.use(require('./routes/home'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files

// Server is listening 

app.listen(() => {
    console.log('Server is listening on port', port)
})