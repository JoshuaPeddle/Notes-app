var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var router = express.Router();
const mongo = require('../utils/db');


/**
 * Gets the Notes collection
 * @returns The Notes collection from MongoDB
 */
async function _get_users_collection() {
	let db = await mongo.getDb();
	return await db.collection('users');
}

/**
 * Using passport-local to authenticate users locally
 * User is fetched from the DB.
 * Implementation purposely not described here.
 */
let iterations = parseInt(process.env.ITERATIONS);
let keylen = parseInt(process.env.KEYLEN);
let digest = process.env.DIGEST;
passport.use(new LocalStrategy(async function verify(username, password, cb) {
	let collection = await _get_users_collection();
	let user = await collection.findOne({ 'username': username });
	if (user === null) {
		return cb(null);
	}
	crypto.pbkdf2(password, Buffer.from(user.salt, 'hex'), iterations, keylen, digest, function (err, hashedPassword) {
		if (err) { return cb(err); }
		if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'hex'), hashedPassword)) {
			return cb(null, false, {
				message: 'Incorrect username or password.'
			});
		}
		user.id = user._id; // Make mongoDB compatible with sessions
		return cb(null, user);
		
	});

}));

/* Submit a username as password to this method as shown below
 *  <form action="/login/password" method="post">
		<section>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" autocomplete="username" required autofocus>
		</section>
		<section>
			<label for="current-password" class="form-label">Password</label>
			<input id="current-password" name="password" type="password" autocomplete="current-password" required>
		</section>
		<button type="submit">Add note</button>
	</form> 
*/
router.post('/login/password', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/'
}));

/**
 * Log a user out. User data is stored in the req object and will be processed by the req.logout function.
 */
router.post('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

/**
 * Route to post user data to to request a signup.
 * Expected data is username and password
 * <form action="/signup" method="post">
		<section>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" autocomplete="username" required>
		</section>
		<section>
			<label for="new-password" class="form-label">Password</label>
			<input id="new-password" name="password" type="password" autocomplete="new-password" required>
		</section>
		<button type="submit">Signup</button>
	</form>
 */
router.post('/signup', function (req, res, next) {
	// Username is free. Encrypt the password and add the user to the database
	var salt = crypto.randomBytes(16);
	crypto.pbkdf2(req.body.password, salt, iterations, keylen, digest, async function (err, hashedPassword) {
		if (err) { return next(err); }
		// Get the user collection from the database
		let collection = await _get_users_collection();
		// Check if username already exists
		// Try to get a user with that name, if it exists throw it out
		let doesExist = await collection.findOne({ 'username': req.body.username });
		if (doesExist) {
			return res.send('Username already exists');
		}
		collection.insertOne({
			'username': req.body.username,
			'hashed_password': hashedPassword.toString('HEX'),
			'salt': salt.toString('HEX')
		},
		function (err, response_from_db) {
			if (err) { return next(err); }
			var user = {
				id: response_from_db.insertedId.toString(),
				username: req.body.username
			};
				// Try to log the new user in
			req.login(user, function (err) {
				if (err) { return next(err); }
				res.redirect('/');
			});
		});
	});
});

/* GET home page. */
router.delete('/users', async function (req, res) {
	let collection = await _get_users_collection();
	collection.deleteOne(req.body, function (err, obj) {
		if (err) { res.send('error'); }
		if (obj.deletedCount === 1) {
			res.sendStatus(200);
		} else {
			res.send('User does not exist');
		}
	});
});


passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

module.exports = router;
