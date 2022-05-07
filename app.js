var session = require('express-session');
var passport = require('passport');
var express = require('express');
var path = require('path');
require('dotenv').config({ path: './.env' })



/* declare global app */
var app = express();

/* Import Routers */
var noteRouter = require('./routes/notes.js');
var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');

app.use(express.static(path.join(__dirname, 'view')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.authenticate('session'))

/* Use Routers */
app.use('/', noteRouter);
app.use('/', indexRouter);
app.use('/', authRouter);

module.exports = app;
