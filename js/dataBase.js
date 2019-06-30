var mysql = require('mysql');

//conection properties
var con = mysql.createConnection({
  host: "localhost",
  user: "root"
});

//conect to DataBase
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
      
  });