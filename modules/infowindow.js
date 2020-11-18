import forEach from "../node_modules/lodash-es/_arrayEach.js"

/** 
* Create new infowindow
* @param {String} map - Map object
* @param {String} content - Content of infowindow
* @param {Array} options - Options of infowindow
* @param {Boolean} open - If infowindow will open after create
* @param {Function} callback - Callback function
* @return {InfoWindow} Infowindow Object
*/
export function newInfoWindow(map, content, options = {}, open = false, callback) {
  var infowindow = new google.maps.InfoWindow({
    content: content,
    options
  });

  if (open) {
    infowindow.open(map);
  }

  if (typeof callback == "function") {
    callback(infowindow);
  }

  return infowindow;
}

/**
* Close a specific infowindow
* @param {Object} infowindow - Infowindow object
*/
export function close(infowindow) {
  infowindow.close();
}

/**
* Close all infowindow
* @param {Array} infowindow_list - List of infowindow
*/
export function closeAll(infowindow_list) {
  if (infowindow_list) {
    infowindow_list = Object.values(infowindow_list);
    forEach(infowindow_list, function (index) {
      index.close();
    });
  }
}