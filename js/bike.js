function BikeModule() {
}

BikeModule.prototype.getData = function(input, displayData) {
  $.get('https://bikeindex.org/api/v3/search?manufacturer=' + input)
  .then(function(response) {
    displayData(response.bikes);
  });
  // .fail(function() {
  //   console.log('ain\'t workin');
  // });
};

exports.bikeModule = BikeModule;
