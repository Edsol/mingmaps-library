/**
 * Disegna il percorso sulla mappa
 * @param {map} map Oggetto map
 * @param {response} response Oggetto response
 * @param {bool} show_shortest flag per visualizzare o nascondere il percorso più corto
 * @param {bool} show_fastest flag per visualizzare o nascondere il percorso più veloce
 */
function drawRouteLine(map, response, show_shortest = false, show_fastest = true) {
  var shortest_route, fastest_route;
  var fastest = Number.MAX_VALUE,
    shortest = Number.MAX_VALUE;
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  response.routes.forEach(function (route) {
    if (route.legs[0].distance.value < shortest) shortest = route.legs[0].distance.value;
    if (route.legs[0].duration.value < fastest) fastest = route.legs[0].duration.value;
  })

  response.routes.forEach(function (route, index) {
    var polylineOptions;

    if (route.legs[0].duration.value == fastest && show_shortest) {
      shortest_route = route;
      polylineOptions = {
        strokeColor: "blue",
        strokeOpacity: 1,
        strokeWeight: 6,
      };
    }
    if (route.legs[0].distance.value == shortest && show_fastest) {
      fastest_route = route;
      polylineOptions = {
        strokeColor: "green",
        strokeOpacity: 1,
        strokeWeight: 6,
      };
    }

    if (polylineOptions) {
      new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        routeIndex: index,
        polylineOptions: polylineOptions,
        suppressMarkers: true,
        preserveViewport: true
      })
    }
  })

  return {
    fastest: fastest_route,
    shortest: shortest_route
  };
}