function connectToDatabase() {
	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: '37.59.55.185',
		user: 'sxQCd7ISon',
		password: 'ZTTqpyPVNA'
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log('Connected!');
	});
}
connectToDatabase();
