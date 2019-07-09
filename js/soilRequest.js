function getSoils() {
	var cropsTable = $('#cropsTable');

	var xhr = new XMLHttpRequest();

	xhr.open(
		'GET',
		'https://rest.soilgrids.org/query?lon=' + window.longitude + '&lat=' + window.latitude + '&attributes=PHIKCL',
		false
	);

	xhr.send();

	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		var json = JSON.parse(xhr.responseText);
		var ph =
			(json['properties'].PHIKCL.M.sl1 + json['properties'].PHIKCL.M.sl2 + json['properties'].PHIKCL.M.sl3) / 30;
		ph = ph.toFixed(1);
	}

	var xhr2 = new XMLHttpRequest();

	xhr2.open(
		'GET',
		'https://api.weatherbit.io/v2.0/forecast/daily?&lat=' +
			window.latitude +
			'&lon=' +
			window.longitude +
			'&days=16&key=bdf918ddf5a64a7c8092dc8b6aadfa2c',
		false
	);

	xhr2.send();

	if (xhr2.status != 200) {
		alert(xhr2.status + ': ' + xhr2.statusText);
	} else {
		var json1 = JSON.parse(xhr2.responseText);
		var sum = 0;
		json1.data.forEach((element) => {
			sum += element.temp;
		});
		var temp = sum / 16;
		temp = temp.toFixed(1);
	}

	var family1 = $('#dropDownList1').val();
	var family2 = $('#dropDownList2').val();
	var family3 = $('#dropDownList3').val();

	var xhr1 = new XMLHttpRequest();

	xhr1.open(
		'GET',
		'https://soil-245714.appspot.com/123/?ph=' +
			ph +
			'&temp=' +
			temp +
			'&family1=' +
			family1 +
			'&family2=' +
			family2 +
			'&family3=' +
			family3,
		false
	);

	xhr1.send();
		cropsTable.html(" ");
	if (xhr1.status != 200) {
		alert(xhr1.status + ': ' + xhr1.statusText);
	} else {
		var jsonCrops = JSON.parse(xhr1.responseText);
		for (element of jsonCrops) {
			cropsTable=
			'<div class="col-md-3 col-xl-3 col-sm-3 col-lg-3">'+
				'<div class="card" >'+
					'<img class="card-img-top" style="height=30%; width=100%;" src="'+element.pageLink+ '" alt="Card image cap">'+
					'<div class="card-body">'+
						'<h5 class="card-title">'+element.name+'</h5>'+
						'<p class="card-text">'+element.family+'</p>'+
						'<a class="card-text" href="'+element.description+'">'+"Description"+'</a>'+			  
					'</div>'+
			  	'</div>'+
			'</div>';
			$('#cropsTable').append(cropsTable);
		}
		
		
		$('#crops-table-page').css('visibility', 'visible','display','block').fadeIn(1000);
	}
}

function getCrops() {
	var xhr3 = new XMLHttpRequest();

	xhr3.open('GET', 'http://soil-245714.appspot.com/25', false);

	xhr3.send();

	if (xhr3.status != 200) {
		alert(xhr3.status + ': ' + xhr3.statusText);
	} else {
		var json2 = JSON.parse(xhr3.responseText);

		for (element of json2) {
			$('.dropDownList').append($('<option ></option>').val(element.family).html(element.name));
		}
	}
}
function getFertilizers() {
	var xhr = new XMLHttpRequest();

	xhr.open(
		'GET',
		'https://rest.soilgrids.org/query?lon=' + window.longitude + '&lat=' + window.latitude + '&attributes=PHIKCL',
		false
	);

	xhr.send();

	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		var json = JSON.parse(xhr.responseText);
		var ph =
			(json['properties'].PHIKCL.M.sl1 + json['properties'].PHIKCL.M.sl2 + json['properties'].PHIKCL.M.sl3) / 30;
		ph = ph.toFixed(1);
	}

	var name = $('#dropDownFat1 option:selected').text();
	var pHText = $('#soil-info-output-text');
	var phLevel = $('#phLevel');

	var xhr4 = new XMLHttpRequest();

	xhr4.open('GET', 'http://soil-245714.appspot.com/31/?name=' + name + '&ph=' + ph, false);
	xhr4.send();
	if (xhr4.status != 200) {
		console.log(xhr4.status + ': ' + xhr4.statusText);
	} else {
		if (xhr4.responseText.includes('ok')) {
			phLevel.text('Your ph level is ' + ph);
			pHText.text('PH level is fine for planting');
			$('#fert-table-page').css('visibility', 'visible','display','block').slideDown(1000);
		} else {
			var table = '<table><th>Name</th><th>Description   </th>';
			var json1 = JSON.parse(xhr4.responseText);
			phLevel.text('Your ph level is ' + ph);
			pHText.text('Crop cannot be planted successfuly');
			pHText.append('<p>Some fertilizers to change the acidity of your soil</p>')
			for (element of json1) {
				table += '<tr><td>' + element.name + '</td><td><a href="' + element.description + '">URL</a></td></tr>';
			}
			table += '</table>';
			$('#fertTable').html(table);
			$('#fert-table-page').css('visibility', 'visible','display','block').slideDown(1000);
		}
	}
}
