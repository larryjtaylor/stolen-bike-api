(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function BikeModule() {
}

BikeModule.prototype.getData = function(manufacturer, location, displayData) {
  $.get('https://bikeindex.org/api/v3/search?manufacturer=' + manufacturer + '&location=' + location + '&distance=10&stolenness=proximity')
  .then(function(response) {
    displayData(response.bikes);
  });
  // .fail(function() {
  //   console.log('ain\'t workin');
  // });
};

exports.bikeModule = BikeModule;

},{}],2:[function(require,module,exports){
function MapModule() {

}

// MapModule.prototype.initMap = function() {
//   var Portland = {lat: 45.5231, lng: 122.6765};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 13,
//     center: Portland,
//     mapTypeId: 'terrain'
//   });
//
//   var marker = new google.maps.Marker({
//     position: Portland,
//     map: map
//   });
// };

// $.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyCnjUZ5ZfeZvFXXKpg1AJRGYAn8a3sqfUk&callback=initMap")
// .then(function() {
//   var newMap = new MapModule();
//   newMap.initMap();
//   // displayMap(map);
// });

exports.mapModule = MapModule;

},{}],3:[function(require,module,exports){
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
    zoom: 10,
    center: Portland,
    mapTypeId: 'terrain'
  });
  var marker = new google.maps.Marker({
    position: Portland,
    map: map
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

},{"./../js/bike.js":1,"./../js/map.js":2}]},{},[3]);
