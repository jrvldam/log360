$(document).ready(function(){

	var strReplace = function(str) {
		return str.replace(/~/, '\n');
	};

	var arrToList = function(arr) {
		var text = '';
		for (var i = 0; i < arr.length; i++) {
			text += strReplace('- ' + arr[i] + ((i < arr.length -1)? '\n' : ''));
		}
		return text;
	};

	var strToProp = function(str) {
		return (str.replace(/\n/, '~')).trim();
	};

	var listToArray = function(list) {
		var arr =[];
		list = list.split('\n');
		for (var i = 0; i < list.length; i++) {
			if (list[i]) {
				arr.push((list[i].replace(/-/, '')).trim());
			}
		}
		return arr;
	};

	var getData = function() {
		var data = { 
			"empresa": {
				"title": strToProp($('#titEmp').val()), 
				"text": strToProp($('#txtEmp').val())
			}, 
			"compromiso": {
				"title": strToProp($('#titComp').val()), 
				"text": strToProp($('#txtCopm').val())
			}, 
			"servicios": {
				"title": strToProp($('#titServ').val()), 
				"text": listToArray($('#txtServ').val())
			} 
		};

		return data;
	};

	$.get('admin/getJSON', function(data) {
		if (data.err) {
			$('#error').val(data.err.message);
		}else {
			$('#titEmp').val(strReplace(data.empresa.title));
			$('#txtEmp').val(strReplace(data.empresa.text));
			$('#titComp').val(strReplace(data.compromiso.title));
			$('#txtCopm').val(strReplace(data.compromiso.text));
			$('#titServ').val(strReplace(data.servicios.title));
			$('#txtServ').val(arrToList(data.servicios.text));
		}
	});

	$('#send').click(function(e) {
			$.ajax({
		    type: "POST",
		    url: "admin/save",
		    data: getData(),
		    success: function(save) {
		      if (save) {
		      	$('#error').text('Guardado!');
		      }else {
		      	$('#error').text('Error al guardar!');
		      }
		    }
			});
	});

});	
