var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	res.set('Cache-control', 'no-cache');
	if(req.user){  // If user has an active session skip login page
		res.redirect('notes.html');
	}else{   // No active session, go to login page
		res.redirect('login.html');
	}
});




module.exports = router;