//c:/Users/VovKulaka/Desktop/SOIL/index.html
var express = require('express');

var app = express();



app.use(express.static("c:/Users/VovKulaka/Desktop/SOIL/"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/123', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    var mysql = require('mysql');
    
    
    var con = mysql.createConnection({
      host: "37.59.55.185",
      user: "sxQCd7ISon",
      password: "ZTTqpyPVNA",
      database: "sxQCd7ISon"
    });
    
    
    con.connect(function(err) {
        if (err) throw err;
        
        con.query("SELECT * FROM Crops where bestPH="+req.query.ph+"and where bestTemperature="+req.query.temp, function (err, result, fields) {
          if (err) throw err;
          /*Object.keys(result).forEach(function(key) {
            var row = result[key];
            data=row.name;
            console.log(row.name)
          });*/
          res.send(result);
        });
          
      });
    
    
  });
  /*app.get('/25', function(req, res){
    res.send('id: ' + req.query.id);
  });*/
  app.get('/25', function(req, res){
    var mysql = require('mysql');
    
    
    var con = mysql.createConnection({
      host: "37.59.55.185",
      user: "sxQCd7ISon",
      password: "ZTTqpyPVNA",
      database: "sxQCd7ISon"
    });
    
    
    con.connect(function(err) {
        if (err) throw err;
        
        con.query("SELECT name FROM Crops", function (err, result, fields) {
          if (err) throw err;
          /*Object.keys(result).forEach(function(key) {
            var row = result[key];
            data=row.name;
            console.log(row.name)
          });*/
          res.send(result);
        });
          
      });
  });
app.listen(8080);

console.log('Сервер стартовал!');
