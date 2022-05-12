var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	if(req.user){  // If user has an active session skip login page
		console.log(__dirname);
		res.sendFile(path.join(__dirname, '..', 'view', 'notes.html'));
	}else{   // No active session, go to login page
		res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
	}
});

module.exports = router;
