// /**
//  * Adds two numbers.
//  * @param {object} map Oggetto map
//  * @param {latLng} latLng Oggetto latLng con le coordinate del marker
//  * @param {string} Titolo del marker
//  * @param {icon} icon Iconal del marker
//  */
// function createMarker(map, latLng, title, icon, draggable = false, attributes = {}) {

//   marker = new google.maps.Marker({
//     position: latLng,
//     map: map,
//     title: title,
//     animation: google.maps.Animation.DROP,
//     draggable: draggable,
//     icon: icon,
//     attributes
//   });


//   return marker;
// }

const default_marker = {
  red: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  blue: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  green: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  orange: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
};

const default_circle = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  draggable: false
};

/**
* Create a simple marker o marker witch circle
* @param {element} element - Element to bind at listener
* @param {latLng} latLng - latLng position element
* @param {string} title - Title of marker
* @param {icon} icon - Icon element
* @param {boolean} draggable - If marker is draggable
* @param {Array} attributes - Marker attributes
* @param {int} radius - Radius of circle
* @param {Array} circleData - Data of circle element
* @return {Array} return marker and the circle object
*/
function newMarker(map, latLng, title, icon, draggable = false, attributes = {}, circleData = null, callback) {
  var circle;

  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
    draggable: draggable,
    icon: icon,
    attributes
  });

  // marker_id = address_markers.length + 1;
  // address_marker.set("id", marker_id);
  // address_markers.push(address_marker);
  // address_marker.setMap(map);


  if (circleData) {
    circleData.map = map;
    circleData.center = latLng;

    circle = new google.maps.Circle(circleData);
  }

  if (typeof callback == "function") {
    callback(marker, circle);
  }

  return {
    marker: marker,
    circle: circle
  };
}