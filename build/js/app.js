(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function BikeModule() {
  this.getZip;
}

BikeModule.prototype.getData = function(manufacturer, location, displayData) {
  $.get('https://bikeindex.org/api/v3/search?manufacturer=' + manufacturer + '&location=' + location + '&distance=1&stolenness=proximity')
  .then(function(response) {
    // console.log(response);
    displayData(response.bikes);
  });
  // .fail(function() {
  //   console.log('ain\'t workin');
  // });
};

BikeModule.prototype.getZip = function(manufacturer, location, displayData) {
  $.get('https://bikeindex.org/api/v3/search?manufacturer=' + manufacturer + '&location=' + location + '&distance=10&stolenness=proximity')
  .then(function(response) {
    var zipArray = [];
    response.bikes.forEach(function(bike) {
      var bikeZip = bike.stolen_location.slice(-5);
      zipArray.push(bikeZip);
    });
    this.getZip = zipArray;

      var Portland = {lat: 45.5207, lng: -122.677397};
      var mapObject = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: Portland,
        mapTypeId: 'terrain'
      });

      for(var i = 0; i < zipArray.length; i++){
        $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zipArray[i])
        .then(function(response) {
          console.log(response.results);
          var latitude = response.results[0].geometry.location.lat;
          var longitude = response.results[0].geometry.location.lng;
          var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: mapObject
          });
          // console.log(response.lat);
          // console.log(response.lng);
        });
      }
  });
};

exports.bikeModule = BikeModule;

},{}],2:[function(require,module,exports){
var BikeModule = require('./../js/bike.js').bikeModule;
// var MapModule = require('./../js/map.js').mapModule;

var displayData = function(results) {
  // console.log(results);
  results.forEach(function(result) {
    $('#result').append("<li>A " + result.title + " was taken from " + result.stolen_location + ".</li>");
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

},{"./../js/bike.js":1}]},{},[2]);
