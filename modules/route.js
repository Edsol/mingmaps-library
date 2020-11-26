import * as Infowindow from './infowindow.js';

let directionsService = new google.maps.DirectionsService();
var delayFactor = 1;
/**
* Draw route bewteen two points
* @param {map} map Oggetto map
* @param {Object} start_point Start point object
* @param {Object} end_point End point object
*/
export function drawRouteBetweenPoints(map, start_point, end_point, show_info = false, callback) {
  var result_routes;

  var route = {
    origin: start_point.getPosition(),
    destination: end_point.getPosition(),
    provideRouteAlternatives: true,
    avoidTolls: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  getDirectionsRoute(route, function (status, response) {
    drawRouteLine(map, response, false, true, (fastest, shortest) => {
      if (fastest) {
        if (show_info) {
          fastest['infowindow'] = createDestinationInfoWindow(map, fastest.route);
        }

        result_routes = {
          route: fastest.route,
          direction: fastest.direction,
          infowindow: fastest.infowindow
        };

        if (typeof callback == "function") {
          callback(status, response, result_routes);
        }

        return result_routes;
      }
    });
  });

}

function getDirectionsRoute(request, callback) {
  directionsService.route(request, (response, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      if (typeof callback == "function") {
        callback(status, response);
      }
    } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
      console.log("OVER_QUERY_LIMIT", delayFactor);
      delayFactor++;
      setTimeout(function () {
        getDirectionsRoute(request, callback);
      }, delayFactor * 1000);
    } else {
      console.log("Route: " + status);
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
export function drawRouteLine(map, response, show_shortest = false, show_fastest = true, callback) {
  var shortest_route, fastest_route;
  var fastest = Number.MAX_VALUE,
    shortest = Number.MAX_VALUE;
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  response.routes.forEach(function (route) {
    var duration_value = getDurationValue(route);
    if (duration_value < shortest) shortest = duration_value;
    if (duration_value < fastest) fastest = duration_value;
  });

  response.routes.forEach(function (route, index) {
    var duration_value = getDurationValue(route);

    if (duration_value === fastest && show_shortest) {
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
        preserveViewport: false
      });

      shortest_route = {
        route: route,
        direction: direction_render
      };
    }

    if (duration_value === shortest && show_fastest) {
      var random_color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      var direction_render = new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        routeIndex: index,
        polylineOptions: {
          // strokeColor: "green",
          strokeColor: random_color,
          strokeOpacity: 1,
          strokeWeight: 6,
        },
        suppressMarkers: true,
        preserveViewport: false
      });

      fastest_route = {
        random_color: random_color,
        route: route,
        direction: direction_render
      };
    }
  });

  if (typeof callback == "function") {
    callback(fastest_route, shortest_route);
  }

  return {
    fastest: fastest_route,
    shortest: shortest_route
  };
}

/**
 * Create destination's infowindow
 * @param {Object} map Map Object
 * @param {Object} route Route object
 */
export function createDestinationInfoWindow(map, route) {
  if (route) {
    var leg = route.legs[0];
    var last_step = leg.steps[leg.steps.length - 1];

    var distance_title = document.createElement("span");
    distance_title.innerHTML = 'Distanza: ';
    distance_title.setAttribute('class', 'distance_title');

    var distance_value = document.createElement("span");
    distance_value.innerHTML = getDistanceText(route);
    distance_value.setAttribute('class', 'distance_value');

    var duration_title = document.createElement("span");
    duration_title.innerHTML = 'Duranta: ';
    duration_title.setAttribute('class', 'duration_title');

    var duration_value = document.createElement("span");
    duration_value.innerHTML = getDurationText(route);
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

/** 
* Get distance value from route
* @param {Object} route - Route Object
* @return {String} Distance value
*/
export function getDistanceValue(route) {
  if (route == undefined) {
    return null;
  }
  var leg = route.legs[0];
  return leg.distance.value;
}

/**
* Get duration value from route
* @param {Object} route - Route Object
* @return {String} Duration value
*/
export function getDurationValue(route) {
  if (route == undefined) {
    return null;
  }

  var leg = route.legs[0];
  return leg.duration.value;
}

/** 
* Get distance text from route
* @param {Object} route - Route Object
* @return {String} Distance value
*/
export function getDistanceText(route) {
  if (route == undefined) {
    return null;
  }
  var leg = route.legs[0];
  return leg.distance.text;
}

/**
* Get duration text from route
* @param {Object} route - Route Object
* @return {String} Duration value
*/
export function getDurationText(route) {
  if (route == undefined) {
    return null;
  }
  var leg = route.legs[0];
  return leg.duration.text;
}