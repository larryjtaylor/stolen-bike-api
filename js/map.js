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
