const https = require('https');
var lon='37.23601811981711';
var lat='50.1229138611611';

https.get('https://rest.soilgrids.org/query?lon='+lon+'&lat='+lat+'&attributes=PHIKCL', (resp) => {
  let data = '';

  
  resp.on('data', (chunk) => {
    data += chunk;
  });

  

  resp.on('end', () => {
    var json = JSON.parse(data);
    //console.log(json["properties"].PHIKCL.M.sl1);
    console.log(json);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});