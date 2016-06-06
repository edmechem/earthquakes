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

	$("#most-recent").on("submit", function(event){

		event.preventDefault();

		$.ajax({
			url:'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
			type: 'GET',
			context: this
		}).done(function(data) {


			var earthquakePositions = [];
			var earthquakes = data.features
			earthquakes.forEach(function(earthquake) {
				earthquakePositions.push(earthquake.geometry.coordinates);
			});
			var quake = earthquakes[0];
			var quakePosition = earthquakePositions[0];
			var quakeLng = quakePosition[0];
			var quakeLat = quakePosition[1];
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
			$('#quake-info').empty();
			$('#quake-info').append(quake.properties.place);

		});

	});

	$("#biggest-month").on("submit", function(event){

		event.preventDefault();
		// var endTimeSeconds = Date.now();
		// var endTimeDate = new Date(0);
		// endTimeDate.setUTCSeconds(endTimeSeconds);
		var endTime = new Date();
		var startTime = new Date();
		startTime.setDate(startTime.getDate()-30);
		endTime = endTime.toISOString().substring(0,10);
		startTime = startTime.toISOString().substring(0,10);

		$.ajax({
			url:"http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime,
			type: 'GET',
			context: this
		}).done(function(data) {


			var earthquakePositions = [];
			var earthquakes = data.features
			earthquakes.forEach(function(earthquake) {
				earthquakePositions.push(earthquake.geometry.coordinates);
			});
			var quake = earthquakes[0];
			var quakePosition = earthquakePositions[0];
			var quakeLng = quakePosition[0];
			var quakeLat = quakePosition[1];
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
			$('#quake-info').empty();
			$('#quake-info').append(quake.properties.place);

		});

	});

	$("#biggest-week").on("submit", function(event){

		event.preventDefault();
		// var endTimeSeconds = Date.now();
		// var endTimeDate = new Date(0);
		// endTimeDate.setUTCSeconds(endTimeSeconds);
		var endTime = new Date();
		var startTime = new Date();
		startTime.setDate(startTime.getDate()-7);
		endTime = endTime.toISOString().substring(0,10);
		startTime = startTime.toISOString().substring(0,10);

		$.ajax({
			url:"http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime,
			type: 'GET',
			context: this
		}).done(function(data) {


			var earthquakePositions = [];
			var earthquakes = data.features
			earthquakes.forEach(function(earthquake) {
				earthquakePositions.push(earthquake.geometry.coordinates);
			});
			var quake = earthquakes[0];
			var quakePosition = earthquakePositions[0];
			var quakeLng = quakePosition[0];
			var quakeLat = quakePosition[1];
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
			$('#quake-info').empty();
			$('#quake-info').append(quake.properties.place);

		});

	});

	$("#biggest-day").on("submit", function(event){

		event.preventDefault();
		// var endTimeSeconds = Date.now();
		// var endTimeDate = new Date(0);
		// endTimeDate.setUTCSeconds(endTimeSeconds);
		var endTime = new Date();
		var startTime = new Date();
		startTime.setDate(startTime.getDate()-1);
		endTime = endTime.toISOString().substring(0,10);
		startTime = startTime.toISOString().substring(0,10);

		$.ajax({
			url:"http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime,
			type: 'GET',
			context: this
		}).done(function(data) {


			var earthquakePositions = [];
			var earthquakes = data.features
			earthquakes.forEach(function(earthquake) {
				earthquakePositions.push(earthquake.geometry.coordinates);
			});
			var quake = earthquakes[0];
			var quakePosition = earthquakePositions[0];
			var quakeLng = quakePosition[0];
			var quakeLat = quakePosition[1];
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
			$('#quake-info').empty();
			$('#quake-info').append(quake.properties.place);

		});

	});




})
