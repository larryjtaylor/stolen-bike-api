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
          // console.log(response.results[0].geometry);
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
