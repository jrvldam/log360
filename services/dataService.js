var fs = require('fs');

var dataService = function() {
	
	var getData = function(data) {
		var aux = {
			empresa: {
				title: data.empresa.title,
				text: data.empresa.text,
				image: data.empresa.image
			},
			compromiso: {
				title: data.compromiso.title,
				text: data.compromiso.text,
				image: data.compromiso.image
			},
			servicios: {
				title: data.servicios.title,
				text: data.servicios.text,
				image: data.servicios.image
			}
		};

		return aux;
	}
	
	return {
		load: function(callback) {
			fs.readFile('../data/data.json', 'utf8', function(err, data) {
				if (err) {
					console.error(err);
					return callback(err, null);
				}
				
				data = JSON.parse(data);
				return callback(null, data);
			});
		},
		save: function(newData, callback) {

			fs.writeFile('../data/data.json', getData(newData), 'utf8', function(err) {
				if (err) return callback(err, null);

				return callback(null, true);
			});
		}
	}
};

module.exports = dataService;