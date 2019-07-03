
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
  var temp=ph1;
  alert( ph1 ); 
}

var family1=$('#dropDownList1').val();
var family2=$('#dropDownList2').val();
var family3=$('#dropDownList3').val();


var xhr1 = new XMLHttpRequest();

xhr1.open('GET', 'http://127.0.0.1:8080/123/?ph='+ph+"&temp="+temp+"&family1="+family1+"&family2="+family2+"&family3="+family3, false);


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
  var json2 = JSON.parse(xhr3.responseText);
  
  for(element of json2 ){
    $('.dropDownList').append(
      $('<option ></option>').val(element.family).html(element.name)
  );
  }
}
}
function getFertilizers(){

  var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://rest.soilgrids.org/query?lon='+window.longitude+'&lat='+window.latitude+'&attributes=PHIKCL', false);

xhr.send();

if (xhr.status != 200) {
 
  alert( xhr.status + ': ' + xhr.statusText ); 
} else {
  var json = JSON.parse(xhr.responseText);
  var ph=(json["properties"].PHIKCL.M.sl1 + json["properties"].PHIKCL.M.sl2 + json["properties"].PHIKCL.M.sl3)/30;
  ph= ph.toFixed(1);
   
}

var name = $('#dropDownFat1  :selected').html();


var xhr4 = new XMLHttpRequest();

xhr4.open('GET', 'http://127.0.0.1:8080/31/?name='+name+'&ph='+ph, false);


xhr4.send();
console.log(ph)
if (xhr4.status != 200) {
 
  alert( xhr4.status + ': ' + xhr4.statusText ); 
} else {
  if(xhr4.responseText.indexOf("ok")+1){
      alert("ok")
  }else {
  var json1 = JSON.parse(xhr4.responseText);
  alert(json1);
  }
  }

}
