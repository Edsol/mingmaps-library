/**
 * Draw route bewteen two points
 * @param {map} map Oggetto map
 * @param {Object} start_point Start point object
 * @param {Object} end_point End point object
 */
function drawRouteBetweenPoints(map, start_point, end_point, show_info = false, callback) {
  let directionsService = new google.maps.DirectionsService();

  var route = {
    origin: start_point.getPosition(),
    destination: end_point.getPosition(),
    provideRouteAlternatives: true,
    avoidTolls: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(route, function (response, status) {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.log('direction NOT ok');
    } else {
      result_routes = drawRouteLine(map, response, false, true, function (fastest, shortest) {
        if (show_info) {
          showInfoWindow(fastest);
        }
      });
    }
    if (typeof callback == "function") {
      callback(status, response);
    }
  });


}

/**
 * Disegna il percorso sulla mappa
 * @param {map} map Oggetto map
 * @param {response} response Oggetto response
 * @param {bool} show_shortest flag per visualizzare o nascondere il percorso più corto
 * @param {bool} show_fastest flag per visualizzare o nascondere il percorso più veloce
 */
function drawRouteLine(map, response, show_shortest = false, show_fastest = true, callback) {
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

  if (typeof callback == "function") {
    callback(fastest_route, shortest_route);
  }

  return {
    fastest: fastest_route,
    shortest: shortest_route
  };
}

function showInfoWindow(point) {
  console.log()
  if (point) {
    leg = point.legs[0];
    last_step = leg.steps[leg.steps.length - 1];

    content = el('div', [
      el('div', [
        el('span.font-weight-bold', 'Distanza: '),
        el('span', leg.distance.text)
      ]),
      el('div', [
        el('span.font-weight-bold', 'Duranta: '),
        el('span', leg.duration.text)
      ])
    ]);

    route_infowindow = newInfoWindow(map, content, {
      position: last_step.end_location,
      pixelOffset: new google.maps.Size(0, -30)
    }, true);
  }
}