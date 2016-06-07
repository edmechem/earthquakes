var map;
var myLatLng = {lat: 37.784580, lng: -122.397437};
var marker;
var images = ['/Markers/paleblue_MarkerA.png', '/Markers/blue_MarkerA.png', '/Markers/pink_MarkerA.png', '/Markers/purple_MarkerA.png', '/Markers/green_MarkerA.png', '/Markers/darkgreen_MarkerA.png', '/Markers/yellow_MarkerA.png', '/Markers/orange_MarkerA.png', '/Markers/red_MarkerA.png'];
var styleArray = [
{
  featureType: "all",
  stylers: [
  { saturation: -70 }
  ]
},{
  featureType: "road.arterial",
  elementType: "geometry",
  stylers: [
  { hue: "#00ffee" },
  { saturation: 80 }
  ]
},{
  featureType: "poi.business",
  elementType: "labels",
  stylers: [
  { visibility: "off" }
  ]
}
];
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 10,
    styles: styleArray
  });

	marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Drag Me!',
    draggable: true,
    icon: '/Markers/brown_MarkerD.png'
  });
  google.maps.event.addListener(marker, 'dragend', function (event) {
    var lat = event.latLng.lat();
    var long = event.latLng.lng();
    var latlng = {lat: lat, lng: long};
    findQuakes(latlng);
  });

}

function findQuakes(location) {
  var latitude = location['lat'];
  var minLat = Math.max(latitude - 2, -90);
  var maxLat = Math.min(latitude + 2, 90);
  var longitude = location['lng'];
  var minLng = Math.max(longitude - 2, -180);
  var maxLng = Math.min(longitude + 2, 180);
  var endTime = new Date();
  var startTime = new Date();
  startTime.setDate(startTime.getDate()-30);
  endTime = endTime.toISOString().substring(0,10);
  startTime = startTime.toISOString().substring(0,10);
  $.ajax({
    url: "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime+"&minlatitude="+minLat +"&maxlatitude="+ maxLat +"&minlongitude=" + minLng + "&maxlongitude=" + maxLng,
    method: 'GET'


  }).done(function(data) {


    var earthquakePositions = [];
    var earthquakes = data.features
    earthquakes.forEach(function(earthquake) {
     earthquakePositions.push(earthquake.geometry.coordinates);
   });

    var bounds = new google.maps.LatLngBounds();
    $('.well').empty();

    var infoWindow = new google.maps.InfoWindow(), marker, i;
    map = new google.maps.Map(document.getElementById('map'), {
     center: myLatLng,
     zoom: 1,
     styles: styleArray
   });
    if (earthquakes.length == 0) {
      initMap();
      $('.well').empty();
      $('.well').append('No quakes found nearby within the past 30 days.');
    } else {
      for (i = 0; i < earthquakes.length; i++) {
       var quake = earthquakes[i];
       var quakePosition = earthquakePositions[i];
       var quakeLng = quakePosition[0];
       var quakeLat = quakePosition[1];
       var myLatLng = {lat: quakeLat, lng: quakeLng};
       var title = quake.properties.place;
       var magnitude = '?'
       var image = null;
       if (quake.properties.mag === null) {
        image = images[8]
      } else { magnitude = quake.properties.mag.toString().substring(0,1);}

      if (magnitude == 0 || magnitude === '-') { image = images[0]};
      if (magnitude == 1 ) { image = images[1]};
      if (magnitude == 2 ) { image = images[2]};
      if (magnitude == 3 ) { image = images[3]};
      if (magnitude == 4 ) { image = images[4]};
      if (magnitude == 5) { image = images[5]};
      if (magnitude == 6) { image = images[6]};
      if (magnitude > 6) { image = images[7]};

        // bounds.extend(myLatLng);
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: title,
          icon: image
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infoWindow.setContent("Location: "+earthquakes[i].properties.place+"<br> Magnitude: "+earthquakes[i].properties.mag);
            infoWindow.open(map, marker);
          }
        })(marker, i));
        map.fitBounds(bounds);
        if (i === earthquakes.length-1) { map.setCenter(myLatLng)}
      };

  }
  map.setZoom(6);
});

}

$(document).ready(function(){

  // var images = ['/Markers/paleblue_MarkerA.png', '/Markers/blue_MarkerA.png', '/Markers/purple_MarkerA.png', '/Markers/pink_MarkerA.png', '/Markers/green_MarkerA.png', '/Markers/darkgreen_MarkerA.png', '/Markers/yellow_MarkerA.png', '/Markers/orange_MarkerA.png', '/Markers/red_MarkerA.png'];
  $("#most-recent").on("click", function(event){

   event.preventDefault();

   $.ajax({
    url:'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    type: 'GET',
    context: this
  }).done(printQuake);

 });
  var printQuake = function(data) {


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
    var magnitude = quake.properties.mag.toString().substring(0,1);
    var image = null;
    if (magnitude == 0 || magnitude === '-') { image = images[0]};
    if (magnitude == 1 ) { image = images[1]};
    if (magnitude == 2 ) { image = images[2]};
    if (magnitude == 3 ) { image = images[3]};
    if (magnitude == 4 ) { image = images[4]};
    if (magnitude == 5) { image = images[5]};
    if (magnitude == 6) { image = images[6]};
    if (magnitude > 6) { image = images[7]};




    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 5,
      styles: styleArray
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!',
      // label: magnitude,
      icon: image
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

  }

  $("#biggest-month").on("click", function(event){

   event.preventDefault();

   var endTime = new Date();
   var startTime = new Date();
   startTime.setDate(startTime.getDate()-30);
   endTime = endTime.toISOString().substring(0,10);
   startTime = startTime.toISOString().substring(0,10);

   $.ajax({
     url:"http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime,
     type: 'GET',
     context: this
   }).done(printQuake);

 });

  $("#biggest-week").on("click", function(event){

   event.preventDefault();

   var endTime = new Date();
   var startTime = new Date();
   startTime.setDate(startTime.getDate()-7);
   endTime = endTime.toISOString().substring(0,10);
   startTime = startTime.toISOString().substring(0,10);

   $.ajax({
     url:"http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="+startTime+"&endtime="+endTime,
     type: 'GET',
     context: this
   }).done(printQuake);

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
		}).done(printQuake);

	});

  $("#all-day").on("click", function(event){

   event.preventDefault();

   $.ajax({
    url:'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    type: 'GET',
    context: this
  }).done(printQuakes);
 });
  var printQuakes = function(data) {


    var earthquakePositions = [];
    var earthquakes = data.features
    earthquakes.forEach(function(earthquake) {
     earthquakePositions.push(earthquake.geometry.coordinates);
   });
    map = new google.maps.Map(document.getElementById('map'), {
     center: myLatLng,
     zoom: 1,
     styles: styleArray
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
     var magnitude = '?'
     var image = null;
     if (quake.properties.mag === null) {
      image = images[0]
    } else { magnitude = quake.properties.mag.toString().substring(0,1);}

    if (magnitude == 0 || magnitude === '-') { image = images[0]};
    if (magnitude == 1 ) { image = images[1]};
    if (magnitude == 2 ) { image = images[2]};
    if (magnitude == 3 ) { image = images[3]};
    if (magnitude == 4 ) { image = images[4]};
    if (magnitude == 5) { image = images[5]};
    if (magnitude == 6) { image = images[6]};
    if (magnitude > 6) { image = images[7]};


        // bounds.extend(myLatLng);
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: title,
          icon: image
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
    }



  })
