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
	})

})
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}


























})