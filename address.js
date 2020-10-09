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


/**
* Create a simple marker o marker witch circle
* @param {element} element - Element to bind at listener
* @param {latLng} latLng - latLng position element
* @param {string} title - Title of marker
* @param {icon} icon - Icon element
* @param {boolean} draggable - If marker is draggable
* @param {int} radius - Radius of circle
* @param {Array} circleData - Data of circle element
* @return {Array} return marker and the circle object
*/
function markerWithCircle(map, latLng, title, icon, draggable = false, marker_attributes = {}, radius = null, circleData = null) {

  address_marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
    draggable: draggable,
    icon: icon,
    marker_attributes
  });

  // marker_id = address_markers.length + 1;
  // address_marker.set("id", marker_id);
  // address_markers.push(address_marker);
  address_marker.setMap(map);


  if (radius) {
    if (!circleData) {
      circleData = default_circle;
    }

    circleData.map = map;
    circleData.center = latLng;
    circleData.radius = radius;

    circle = new google.maps.Circle(circleData);
  }
  return {
    marker: address_marker,
    circle: circle
  };
}
