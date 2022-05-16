var express = require('express');
var router = express.Router();


// Cache static CSS for a day
router.get('/css/*', (req, res, next)=>{
	res.set('Cache-control', 'public, max-age=86400');
	next();
});

// Cache static JS for a day
router.get('/js/*', (req, res, next)=>{
	res.set('Cache-control', 'public, max-age=86400');
	next();
});

// If we're testing, disable the cache
if(process.env.DEV){
	router.get('/*', (req, res, next)=>{
		res.set('Cache-control', 'no-cache');
		next();
	});
}

module.exports = router;