var map;
var marker;
var myLatlng = new google.maps.LatLng(48.29002281830704, 25.93804779096672);
window.latitude = 0;
window.longitude = 0;
var geocoder = new google.maps.Geocoder();
function initialize() {
	var mapOptions = {
		zoom: 18,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('MapForSoils'), mapOptions);

	marker = new google.maps.Marker({
		map: map,
		position: myLatlng,
		draggable: true
	});
	//Search
	var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		searchBox.set('map', null);

		var places = searchBox.getPlaces();
		var bounds = new google.maps.LatLngBounds();
		var i, place;
		for (i = 0; (place = places[i]); i++) {
			(function(place) {
				if (marker == null) {
					marker = new google.maps.Marker({
						position: place.geometry.location
					});
					latitude = marker.getPosition().lat();
					longitude = marker.getPosition().lng();
				} else {
					marker.setPosition(place.geometry.location);
				}
				marker.bindTo('map', searchBox, 'map');
				google.maps.event.addListener(marker, 'map_changed', function() {
					if (!this.getMap()) {
					}
				});
				bounds.extend(place.geometry.location);
			})(place);
		}
		map.fitBounds(bounds);
		searchBox.set('map', map);
		map.setZoom(Math.min(map.getZoom(), 12));
	});

	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
	});

	function placeMarker(location) {
		if (marker == null) {
			marker = new google.maps.Marker({
				position: location,
				map: map
			});
		} else {
			marker.setPosition(location);
			latitude = marker.getPosition().lat();
			longitude = marker.getPosition().lng();
		}
	}

	geocoder.geocode({ latLng: myLatlng }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				//Insert init code for query here
			}
		}
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		geocoder.geocode({ latLng: marker.getPosition() }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					latitude = marker.getPosition().lat();
					longitude = marker.getPosition().lng();
				}
			}
		});
	});
}
google.maps.event.addDomListener(window, 'load', initialize);
