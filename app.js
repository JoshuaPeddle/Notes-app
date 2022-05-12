var express = require('express');
var session = require('express-session');
var passport = require('passport');
const helmet = require('helmet');
var path = require('path');
const mongo = require('./utils/db.js');
const { homepageLimiter, signupLimiter, limiter } = require('./utils/ratelimit.js');
const MongoStore = require('connect-mongo');


/* declare global app */
var app = express();


app.use(helmet({
	originAgentCluster: false,
	crossOriginOpenerPolicy: false,
	crossOriginResourcePolicy: false,
	crossOriginEmbedderPolicy: false,
	contentSecurityPolicy: {
		useDefaults: false,
		directives: {                // eslint-disable-next-line quotes
			'default-src': "'self'", // eslint-disable-next-line quotes
			'script-src': ["https://code.jquery.com/", "'self'"],  // eslint-disable-next-line quotes
			'style-src':  "'self'",
		},
	},
	hsts: false,
	expectCt: false,
}));


app.use(session({
	name: 'notesapp'+parseInt((Math.random() * 10000), 10), // Just need to have diffrent names on instances running onn the same machine 1/10000 are good odds
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	rolling: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_CONNSTRING,
		dbName: process.env.DBNAME
	})
}));
app.use(passport.authenticate('session'));


app.use(express.static(path.join(__dirname, '/view/static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Apply the rate limiting middleware
app.get('/', homepageLimiter);
app.post('/signup', signupLimiter);
app.use('/signup', limiter);

/* Import Routers */
var noteRouter = require('./routes/notes.js');
var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');


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