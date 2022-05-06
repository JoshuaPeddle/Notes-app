var express = require('express');
var path = require('path');
require('dotenv').config({ path: './.env' })



/* declare global app */
var app = express();

/* Import Routers */
var noteRouter = require('./routes/notes.js');
var indexRouter = require('./routes/index.js');

app.use(express.static(path.join(__dirname , 'view')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* Use Routers */
app.use('/', noteRouter);
app.use('/', indexRouter);

module.exports = app;
