var BikeModule = require('./../js/bike.js').bikeModule;

var MapModule = require('./../js/map.js').mapModule;

var displayData = function(results) {
  console.log(results);
  results.forEach(function(result) {
    $('#result').append("<li>A " + result.title + " was taken from " + result.stolen_location + " .</li>");
  });
};

function drawMap() {
  var Portland = {lat: 45.5207, lng: -122.677397};
  var mapObject = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: Portland,
    mapTypeId: 'terrain'
  });
  var marker = new google.maps.Marker({
    position: Portland,
    map: mapObject
  });
}

// var displayMap = function(map) {
//   $('#map').append(map);
// };

$(document).ready(function() {
  var bikeModule = new BikeModule();
  var mapModule = new MapModule();

  drawMap();
  $('#bike-search').submit(function(event) {
    event.preventDefault();

    var manufacturer = $('#manufacturer').val();
    var location = $('#location').val();
    bikeModule.getData(manufacturer, location, displayData);
  });
});
