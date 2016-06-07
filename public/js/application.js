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
// Info Window Content
// var infoWindowContent = [
// ['<div class="info_content">' +
// '<h3>London Eye</h3>' +
// '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
// ['<div class="info_content">' +
// '<h3>Palace of Westminster</h3>' +
// '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
// '</div>']
// ];
    // Display multiple markers on a map
    // // Loop through our array of markers & place each one on the map  
    // for( i = 0; i < markers.length; i++ ) {
    // 	var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    // 	bounds.extend(position);
    // 	marker = new google.maps.Marker({
    // 		position: position,
    // 		map: map,
    // 		title: markers[i][0]
    // 	});

        // Allow each marker to have an info window    

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
				animation: google.maps.Animation.DROP,
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
				animation: google.maps.Animation.DROP,
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
				animation: google.maps.Animation.DROP,
				title: 'Hello World!'
			});
			$('#quake-info').empty();
			$('#quake-info').append(quake.properties.place);

		});

	});

        $("#all-day").on("submit", function(event){

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
        		$('#quake-info').empty();

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


			map.setZoom(2);
		});
        });



      })
