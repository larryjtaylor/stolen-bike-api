$(document).ready(function() {
  $('#bike-search').submit(function(event) {
    event.preventDefault();
    var manufacturer = $('#manufacturer').val();
    var location = $('#location').val();
    var bikes;
    $.get('https://bikeindex.org/api/v3/search?locations=' + location + '&manufacturer=' + manufacturer + "&stolenness=proximity")
    .then(function(response) {
      bikes = response.bikes.manufacturer_name;
    });
    $('#result').html("<ul><li>" + bikes + "</li></ul>");
  });
});
