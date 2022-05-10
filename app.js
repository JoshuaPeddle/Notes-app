var session = require('express-session');
var passport = require('passport');
var express = require('express');
var path = require('path');
const mongo = require('./utils/db.js');
const MongoStore = require('connect-mongo');

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
	store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNSTRING,
		dbName :  process.env.DBNAME})
}));
app.use(passport.authenticate('session'));

/* Use Routers */
app.use('/', noteRouter);
app.use('/', indexRouter);
app.use('/', authRouter);

async function tryConnectDB() {
	try {
		await mongo.connectToDB();
	} catch (err) {
		throw new Error('Could not connect to DB!');
	}
	return true;
}
  
tryConnectDB();


module.exports = app;
process.on('SIGINT', () => {
	mongo.closeDBConnection().then(() => {
		console.log('Database connection closed');
	});
});