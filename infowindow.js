/** 
* Create new infowindow
* @param {String} map - Map object
* @param {String} content - Content of infowindow
* @param {Array} options - Options of infowindow
* @param {Boolean} open - If infowindow will open after create
* @param {Function} callback - Callback function
* @return {InfoWindow} Infowindow Object
*/
function newInfoWindow(map, content, options = {}, open = false, callback) {
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