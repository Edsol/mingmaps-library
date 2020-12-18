// import { Translator } from './translator.js';


// var Translator;

// export function constructor() {
//   this.Translator = new Translator();
//   this.Translator.loadLanguage();
// }

var address_search;

/**
* Add a "Place Autocomplete Listener" on specified element
* @param {String} element - ID of element to bind at listener
* @return {function} callback - Callback function
*/
export function addAddressListener(element_id, country, callback) {
  address_search = document.getElementById(element_id);


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

/** 
* Parse address_components information by address autocomplete
* @param {Array} address_components - 
* @return {Array} Structured data response
*/
export function parseAddressComponents(address_components) {
  var associations = {
    home: ["street_number"],
    postal_code: ["postal_code"],
    street: ["street_address", "route"],
    municipality: ["administrative_area_level_3"],
    province: ["administrative_area_level_2"],
    region: [
      "administrative_area_level_1",
      "administrative_area_level_4",
      "administrative_area_level_5"
    ],
    city: [
      "locality",
      "sublocality",
      "sublocality_level_1",
      "sublocality_level_2",
      "sublocality_level_3",
      "sublocality_level_4"
    ],
    country: ["country"]
  };

  var address = {
    home: "",
    postal_code: "",
    street: "",
    province: "",
    region: "",
    city: "",
    country: ""
  };

  address_components.forEach(component => {
    for (var association in associations) {
      if (associations[association].indexOf(component.types[0]) !== -1) {
        address[association] = {
          short: component.short_name,
          long: component.long_name
        };
      }
    }
  });

  return address;
}

export function getCoordinate(place, array = false) {
  if (!place) {
    return null;
  }
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();

  if (array == true) {
    return [lat, lng];
  }
  return {
    lat: lat,
    lng: lng
  };
}