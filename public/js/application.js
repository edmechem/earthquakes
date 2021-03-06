var map;
var myLatLng = {lat: 37.784580, lng: -122.397437};
var marker;
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 10
	});

	marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Hello World!'
	});


}

$(document).ready(function(){   
        $("#most-recent").on("click", function(event){

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
        			animation: google.maps.Animation.DROP,
        			title: 'Hello World!'
        		});
        		var infoWindow = new google.maps.InfoWindow(), marker, i;
        		google.maps.event.addListener(marker, 'click', (function(marker, i) {
        			return function() {
        				infoWindow.setContent("Location: "+quake.properties.place+"<br> Magnitude: "+quake.properties.mag);
        				infoWindow.open(map, marker);
        			}
        		})(marker, i));
        		$('.well').empty();
        		$('.well').append(quake.properties.place);

        	});

        });

        $("#biggest-month").on("click", function(event){

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
				animation: google.maps.Animation.DROP,
				title: 'Hello World!'
			});
			$('.well').empty();
			$('.well').append(quake.properties.place);

		});

	});

        $("#biggest-week").on("click", function(event){

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
				animation: google.maps.Animation.DROP,
				title: 'Hello World!'
			});
			$('.well').empty();
			$('.well').append(quake.properties.place);

		});

	});

        $("#biggest-day").on("click", function(event){

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
				animation: google.maps.Animation.DROP,
				title: 'Hello World!'
			});
			$('.well').empty();
			$('.well').append(quake.properties.place);

		});

	});

        $("#all-day").on("click", function(event){

        	event.preventDefault();

        	$.ajax({
        		url:'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
        		type: 'GET',
        		context: this
        	}).done(function(data) {


        		var earthquakePositions = [];
        		var earthquakes = data.features
        		earthquakes.forEach(function(earthquake) {
        			earthquakePositions.push(earthquake.geometry.coordinates);
        		});
        		map = new google.maps.Map(document.getElementById('map'), {
        			center: myLatLng,
        			zoom: 1
        		});
        		var bounds = new google.maps.LatLngBounds();
        		$('.well').empty();

        		var infoWindow = new google.maps.InfoWindow(), marker, i;

        		for (i = 0; i < earthquakes.length; i++) {
        			var quake = earthquakes[i];
        			var quakePosition = earthquakePositions[i];
        			var quakeLng = quakePosition[0];
        			var quakeLat = quakePosition[1];
        			var myLatLng = {lat: quakeLat, lng: quakeLng};
        			var title = quake.properties.place;
				// bounds.extend(myLatLng);
				marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					animation: google.maps.Animation.DROP,
					title: title
				}); 
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infoWindow.setContent("Location: "+earthquakes[i].properties.place+"<br> Magnitude: "+earthquakes[i].properties.mag);
						infoWindow.open(map, marker);
					}
				})(marker, i));  
							map.fitBounds(bounds);
			};


			map.setZoom(3);
		});
        });



      })
