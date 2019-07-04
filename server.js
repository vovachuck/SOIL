//c:/Users/VovKulaka/Desktop/SOIL/index.html
var express = require('express');

var app = express();

app.use(express.static('c:/Users/VovKulaka/Desktop/SOIL/'));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.get('/123', function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: '37.59.55.185',
		user: 'sxQCd7ISon',
		password: 'ZTTqpyPVNA',
		database: 'sxQCd7ISon'
	});

	con.connect(function(err) {
		if (err) throw err;

		con.query(
			'SELECT * FROM Crops where ' +
				req.query.ph +
				' between bestPHMin and bestPHMax' +
				' and ' +
				req.query.temp +
				" between bestTemperatureMin and bestTemperatureMax and  not (family= '" +
				req.query.family1 +
				"' or family= '" +
				req.query.family2 +
				"' or family= '" +
				req.query.family3 +
				"')",
			function(err, result, fields) {
				if (err) throw err;
				/*Object.keys(result).forEach(function(key) {
            var row = result[key];
            data=row.name;
            console.log(row.name)
          });*/
				res.send(result);
			}
		);
	});
});

app.get('/25', function(req, res) {
	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: '37.59.55.185',
		user: 'sxQCd7ISon',
		password: 'ZTTqpyPVNA',
		database: 'sxQCd7ISon'
	});

	con.connect(function(err) {
		if (err) throw err;

		con.query('SELECT name,family FROM Crops', function(err, result, fields) {
			if (err) throw err;

			res.send(result);
		});
	});
});

app.get('/31', function(req, res) {
	var mysql = require('mysql');
	var phMin;
	var phMax;

	var con = mysql.createConnection({
		host: '37.59.55.185',
		user: 'sxQCd7ISon',
		password: 'ZTTqpyPVNA',
		database: 'sxQCd7ISon'
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT	bestPHMin,bestPHMax FROM Crops where name='" + req.query.name + "'", function(
			err,
			result,
			fields
		) {
      if (err) throw err;
      
			phMin = result[0].bestPHMin;
      phMax = result[0].bestPHMax;
      if (parseFloat(phMax) < parseFloat(req.query.ph)) {
        con.query('SELECT * FROM Fertilizers where pHinfluence=0', function(err, result, fields) {
          if (err) throw err;
  
          res.send(result);
        });
      } else if (parseFloat(req.query.ph) < parseFloat(phMin)) {
        con.query('SELECT * FROM Fertilizers where pHinfluence=1', function(err, result, fields) {
          if (err) throw err;
  
          res.send(result);
        });
      } else {
  
        // When crop can be planted
        res.send('ok');
      }
      
		});
	});
});
app.listen(8080);

console.log('Сервер стартовал!');
