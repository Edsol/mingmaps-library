import * as Infowindow from './infowindow.js';

/**
* Draw route bewteen two points
* @param {map} map Oggetto map
* @param {Object} start_point Start point object
* @param {Object} end_point End point object
*/
export function drawRouteBetweenPoints(map, start_point, end_point, show_info = false, callback) {
  let directionsService = new google.maps.DirectionsService();
  var result_routes = [];

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
      route = drawRouteLine(map, response, false, true, function (fastest, shortest) {
        if (show_info) {
          fastest['infowindow'] = createDestinationInfoWindow(fastest.route);
        }

        result_routes.push(fastest);
      });
    }
    if (typeof callback == "function") {
      callback(status, response);
    }
  });
  return result_routes;
}

/**
 * Disegna il percorso sulla mappa
 * @param {map} map Oggetto map
 * @param {response} response Oggetto response
 * @param {bool} show_shortest flag per visualizzare o nascondere il percorso più corto
 * @param {bool} show_fastest flag per visualizzare o nascondere il percorso più veloce
 */
export function drawRouteLine(map, response, show_shortest = false, show_fastest = true, callback) {
  var shortest_route, fastest_route;
  var fastest = Number.MAX_VALUE,
    shortest = Number.MAX_VALUE;
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  response.routes.forEach(function (route) {
    if (route.legs[0].distance.value < shortest) shortest = route.legs[0].distance.value;
    if (route.legs[0].duration.value < fastest) fastest = route.legs[0].duration.value;
  })

  response.routes.forEach(function (route, index) {
    if (route.legs[0].duration.value == fastest && show_shortest) {
      var direction_render = new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        routeIndex: index,
        polylineOptions: {
          strokeColor: "blue",
          strokeOpacity: 1,
          strokeWeight: 6,
        },
        suppressMarkers: true,
        preserveViewport: true
      });

      shortest_route = {
        route: route,
        direction: direction_render
      };
    }
    if (route.legs[0].distance.value == shortest && show_fastest) {
      var direction_render = new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        routeIndex: index,
        polylineOptions: {
          strokeColor: "green",
          strokeOpacity: 1,
          strokeWeight: 6,
        },
        suppressMarkers: true,
        preserveViewport: true
      });

      fastest_route = {
        route: route,
        direction: direction_render
      };
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

export function createDestinationInfoWindow(point) {
  if (point) {
    var leg = point.legs[0];
    var last_step = leg.steps[leg.steps.length - 1];

    var distance_title = document.createElement("span");
    distance_title.innerHTML = 'Distanza: ';
    distance_title.setAttribute('class', 'distance_title');

    var distance_value = document.createElement("span");
    distance_value.innerHTML = leg.distance.text;
    distance_value.setAttribute('class', 'distance_value');

    var duration_title = document.createElement("span");
    duration_title.innerHTML = 'Duranta: ';
    duration_title.setAttribute('class', 'duration_title');

    var duration_value = document.createElement("span");
    duration_value.innerHTML = leg.duration.text;
    duration_value.setAttribute('class', 'duration_value');

    var div_distance = document.createElement('div');
    div_distance.setAttribute('class', 'distance');
    div_distance.appendChild(distance_title);
    div_distance.appendChild(distance_value);

    var div_duration = document.createElement('div');
    div_duration.setAttribute('class', 'duration');
    div_duration.appendChild(duration_title);
    div_duration.appendChild(duration_value);

    var content = document.createElement("div");
    content.setAttribute('class', 'destination_infowindow');
    content.appendChild(div_distance);
    content.appendChild(div_duration);


    var route_infowindow = Infowindow.newInfoWindow(map, content, {
      position: last_step.end_location,
      pixelOffset: new google.maps.Size(0, -30)
    }, true);

    return route_infowindow;
  }
}