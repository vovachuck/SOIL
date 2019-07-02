
function getSoils(){
  

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://rest.soilgrids.org/query?lon='+window.longitude+'&lat='+window.latitude+'&attributes=PHIKCL', false);

xhr.send();

if (xhr.status != 200) {
 
  alert( xhr.status + ': ' + xhr.statusText ); 
} else {
  var json = JSON.parse(xhr.responseText);
  var ph=(json["properties"].PHIKCL.M.sl1 + json["properties"].PHIKCL.M.sl2 + json["properties"].PHIKCL.M.sl3)/30;
  ph= ph.toFixed(1);
  alert( ph ); 
}

var xhr2 = new XMLHttpRequest();

xhr2.open('GET', 'https://api.weatherbit.io/v2.0/forecast/daily?&lat='+window.latitude+'&lon='+window.longitude+'&days=16&key=bdf918ddf5a64a7c8092dc8b6aadfa2c', false);

xhr2.send();

if (xhr2.status != 200) {
 
  alert( xhr2.status + ': ' + xhr2.statusText ); 
} else {
  var json1 = JSON.parse(xhr2.responseText);
  var sum=0;
  json1.data.forEach(element => {
    sum+= element.temp
  });
  var ph1=sum/16;
  ph1= ph1.toFixed(1);
  alert( ph1 ); 
}

var crop1 = $('#crop-1').value;
var crop2 = $('#crop-2').value;
var crop3 = $('#crop-3').value;
var crop4 = $('#crop-4').value;
var crop5 = $('#crop-5').value;
var usedCropArray = [{crop1,crop2,crop3,crop4,crop5}];
//alert(usedCropArray.toString);*/


var xhr1 = new XMLHttpRequest();

xhr1.open('GET', 'http://127.0.0.1:8080/123/?ph='+ph+"&"+temp, false);


xhr1.send();

if (xhr1.status != 200) {
 
  alert( xhr1.status + ': ' + xhr1.statusText ); 
} else {
  
  alert( xhr1.responseText ); 
}


}
function getCrops(){
  var xhr3 = new XMLHttpRequest();

xhr3.open('GET', 'http://127.0.0.1:8080/25', false);


xhr3.send();

if (xhr3.status != 200) {
 
  alert( xhr3.status + ': ' + xhr3.statusText ); 
} else {
  
  alert( xhr3.responseText ); 
}
}