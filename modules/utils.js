import _ from "../node_modules/lodash-es/lodash.js"

/**
* Dato un punto, un raggio e lista di posizioni restituisce quali marker sono all'interno e quali all'esterno del raggio
* @param {Array} center_position - Punto centrale da cui partire la ricerca
* @param {int} radius - Raggio del punto in cui ricercare
* @param {Array} markers Lista dei marker sui cui effettuare la ricerca
*/
export function findMarkerInsideCircle(center_position, radius, markers, callback) {
  var inside = [];
  var outside = [];

  _.forEach(markers, function (element) {
    if (google.maps.geometry.spherical.computeDistanceBetween(element.getPosition(), center_position) <= radius) {
      inside.push(element);
    } else {
      outside.push(element);
    }
  })

  if (typeof callback == "function") {
    callback(inside, outside);
  }

  return {
    inside: inside,
    outside: outside
  };
}