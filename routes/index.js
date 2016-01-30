var express = require('express');
var router = express.Router();
// var dataService = require('../services/dataService')();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

	// dataService.load(function(err, data) {
	// 	if (err) {
	// 		res.send('error' + err.message);
	// 	}else {
	// 		res.render('index', data);
	// 	}
	// });
	fs.readFile('./data/data.json', 'utf8', function(err, data) {
		if (err) console.error(err);
		data = JSON.parse(data)
		res.render('index', data);
	});	
});

module.exports = router;
