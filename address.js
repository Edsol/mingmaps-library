/**
* Add a "Place Autocomplete Listener" on specified element
* @param {String} element - ID of element to bind at listener
* @return {function} callback - Callback function
*/
function addAddressListener(element_id, country, callback) {
  address_search = document.getElementById(element_id);
  // loadLanguage();

  var options = {
    componentRestrictions: { country: country }
  };
  var autocomplete = new google.maps.places.Autocomplete(address_search, options);

  autocomplete.addListener('place_changed', function () {

    var place = autocomplete.getPlace();
    if (typeof callback == "function") {
      callback(place);
    }
  });
}
