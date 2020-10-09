/**
 * Adds two numbers.
 * @param {object} map Oggetto map
 * @param {latLng} latLng Oggetto latLng con le coordinate del marker
 * @param {string} Titolo del marker
 * @param {icon} icon Iconal del marker
 */
function createMarker(map, latLng, title, icon, draggable = false, attributes = {}) {

  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
    draggable: draggable,
    icon: icon,
    attributes
  });


  return marker;
}