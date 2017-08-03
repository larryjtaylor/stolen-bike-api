var BikeModule = require('./../js/bike.js').bikeModule;
// var MapModule = require('./../js/map.js').mapModule;

var displayData = function(results) {
  // console.log(results);
  results.forEach(function(result) {
    $('#result').append("<li>A " + result.title + " was taken from " + result.stolen_location + " .</li>");
  });
};

// var drawMap = function(zipArray) {
//
// };

$(document).ready(function() {
  var bikeModule = new BikeModule();
  // var mapModule = new MapModule();

  $('#bike-search').submit(function(event) {
    event.preventDefault();

    var manufacturer = $('#manufacturer').val();
    var location = $('#location').val();
    bikeModule.getData(manufacturer, location, displayData);
    var zipArray = bikeModule.getZip(manufacturer, location, displayData);
    $('#map').show();
  });
});
