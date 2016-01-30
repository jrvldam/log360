var router = require('express').Router();
var fs = require('fs');
// var dataService = require('../services/dataService');

var getData = function(data) {
	var aux = {
		empresa: {
			title: data.empresa.title,
			text: data.empresa.text,
			image: data.empresa.image || ''
		},
		compromiso: {
			title: data.compromiso.title,
			text: data.compromiso.text,
			image: data.compromiso.image || ''
		},
		servicios: {
			title: data.servicios.title,
			text: data.servicios.text,
			image: data.servicios.image || ''
		}
	};

	return aux;
}

router.post('/save', function(req, res, next) {
	var save = true;
	var data = getData(req.body);
	fs.writeFile('./data/data.json',JSON.stringify(data, null, 2), 'utf8', function(err) {
		if (err) save = !save;
	  res.send(save);
	});
});

router.get('/getJSON', function(req, res, next) {
	fs.readFile('./data/data.json', 'utf8', function(err, data) {
		if (err) {
			res.json({err: err});
		}else {
			data = JSON.parse(data);
			res.json(data);
		}
	});
});

router.get('/', function(req, res, next) {
	fs.readFile('./data/data.json', 'utf8', function(err, data) {
		if (err) {
			res.json({err: err});
		}else {
			data = JSON.parse(data);
			res.render('admin', data);
		}
	});
});

module.exports = router;
