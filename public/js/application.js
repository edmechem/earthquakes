var map;
var myLatLng = {lat: 37.784580, lng: -122.397437};
var marker;
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 8
	});

	marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Hello World!'
	});


}

$(document).ready(function(){

	$("#user-submit-form").on("submit", function(event){

		event.preventDefault();

		$.ajax({
			url:'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
			type: 'GET'
		}).done(function(data) {

			console.log(data);
			var earthquakePositions = [];
			var earthquakes = data.features
			earthquakes.forEach(function(earthquake) {
				earthquakePositions.push(earthquake.geometry.coordinates);
			});
			console.log(earthquakePositions);
			var quake = earthquakePositions[1];
			var quakeLng = quake[0];
			var quakeLat = quake[1];
			var myLatLng = {lat: quakeLat, lng: quakeLng};
			map = new google.maps.Map(document.getElementById('map'), {
				center: myLatLng,
				zoom: 5
			});

			marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Hello World!'
			});

		});

	});
})
