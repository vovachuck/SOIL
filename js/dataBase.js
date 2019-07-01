var mysql = require('mysql');

//conection properties
var con = mysql.createConnection({
  host: "37.59.55.185",
  user: "sxQCd7ISon",
  password: "ZTTqpyPVNA"
});

//conect to DataBase
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
      
  });
 /* var client = mysql.createClient();
client.host='localhost';
client.port= '3306';
client.user='root';
//client.password='ZTTqpyPVNA';
client.database='mydb';
client.query(query, [params, callback])
client.query('SELECT * FROM plants', function(error, result, fields){
    console.log(result);
});
client.end();*/