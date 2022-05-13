var express = require('express');
var router = express.Router();


router.get('/css/*', (req, res, next)=>{
	res.set('Cache-control', 'public, max-age=31536000, immutable');
	if(process.env.DEV){
		res.set('Cache-control', 'no-cache');
	}
	next();
});


router.get('/js/*', (req, res, next)=>{
	res.set('Cache-control', 'public, max-age=31536000, immutable');
	if(process.env.DEV){
		res.set('Cache-control', 'no-cache');
	}
	next();
});


module.exports = router;