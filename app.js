var express = require('express');
var path = require('path');
require('dotenv').config()



/* declare global app */
var app = express();

/* Import Routers */
var noteRouter = require('./routes/notes.js');

app.use(express.static(__dirname + '/view'))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/* Use Routers */
app.use('/', noteRouter);

module.exports = app;
