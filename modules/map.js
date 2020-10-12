/** 
* Inizialize google maps
* @param {String} map_id - Id of DOM map element
* @param {Array} mapOptions - Map options
* @return {object} map - return google map object
*/
export function initMap(map_id, options = {}, callback) {
  var map_dom_element = document.getElementById(map_id);
  map = new google.maps.Map(map_dom_element, options);

  if (typeof callback == "function") {
    callback(map);
  }

  return map;
}