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
