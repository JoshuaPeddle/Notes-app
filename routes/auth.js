var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local')
var crypto = require('crypto')
const Binary = require("mongodb").Binary
var path = require('path');
var router = express.Router();


const mongo = require('../utils/db');


/**
 * Gets the Notes collection
 * @returns The Notes collection from MongoDB
 */
async function _get_users_collection() {
    let db = await mongo.getDb();
    return await db.collection('users');
};


passport.use(new LocalStrategy(async function verify(username, password, cb) {
    let collection = await _get_users_collection();
    let user = await collection.findOne({ 'username': username })
    if (user == null) {
        return cb(null);
    }
    crypto.pbkdf2(password, Buffer.from(user.salt, "hex"), iterations = 310000, keylen = 32, digest = 'sha256', function (err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, "hex"), hashedPassword)) {
            return cb(null, false, {
                message: 'Incorrect username or password.'
            })
        }
        else {
            console.log("Here")
            return cb(null, user);
        }
    });

}));

/* GET home page. */
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/notes.html',
    failureRedirect: '/'
}));




router.post('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});




router.post('/signup', function (req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) { return next(err); }
        let collection = await _get_users_collection();
        // Check if username already exists
        let doesExist = await collection.findOne({ 'username': req.body.username })
        if (doesExist != undefined) {
            return res.send("Username already exists")
        }
        console.log(hashedPassword)
        // If not insert new user
        collection.insertOne({
            'username': req.body.username,
            'hashed_password': hashedPassword.toString("HEX"),
            "salt": salt.toString("HEX")

        },
            function (err, u) {
                if (err) { return next(err); }
                var user = {
                    id: u.insertedId.toString(),
                    username: req.body.username
                };
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    res.redirect('/');
                });
            });
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
