
var BikeModule = require('./../js/bike.js').bikeModule;

var displayData = function(results) {
  results.forEach(function(result) {
    $('#result').append("<li>" + result.title + "</li>");
  });
};
$(document).ready(function() {
  var bikeModule = new BikeModule();

  $('#bike-search').submit(function(event) {
    event.preventDefault();

    var manufacturer = $('#manufacturer').val();
    bikeModule.getData(manufacturer, displayData);
  });
});
