
export const default_marker = {
  red: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  blue: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  green: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  orange: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
};

export const default_circle = {
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

export function create(options = {}, circleData = null, callback) {
  var circle;

  var marker = new google.maps.Marker(options);


  if (circleData) {
    circleData.map = map;
    circleData.center = options.position;

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