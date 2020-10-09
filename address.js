/**
* Add a "Place Autocomplete Listener" on specified element
* @param {element} element - Element to bind at listener
* @return {function} callback - Callback function
*/
function addAddressListener(element, callback) {
  var autocomplete = new google.maps.places.Autocomplete(element);

  autocomplete.addListener('place_changed', function () {

    var place = autocomplete.getPlace();
    if (typeof callback == "function") {
      callback(place);
    }
  });
}
