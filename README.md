# mingmaps-library

A very simple and quickly library to init, use and manipulate Google map, their markers,routes and infowindows.


# How-to-use
### Import script

```html
<script src="path_of_module/main.js"></script>
```

### Use it

```html
<script type="module">
import * as Mingmaps from 'path_of_module/main.js';
</script>
```

# Example
### Init map

```javascript
Mingmaps.Map.initMap('map',{
  center: {
    lat: 41.4265774,
    lng: 14.4789369
  },
  zoom: 6,
  disableDefaultUI: true,
  mapTypeId: 'hybrid'
},function(map){
  // operation after create map
});
```

### create marker
```javascript

var marker_data = {
  map:map,
  position: {
    lat: 40.4309669,
    lng: 17.4690898,
  },
  title: 'My marker',
  animation: google.maps.Animation.DROP,
  draggable: false,
};

Mingmaps.Marker.create(marker_data,null,
   (marker) => {
    //operation on marker
   }
);
```

### create marker with circle
```javascript

var marker_data = {
  map:map,
  position: {
    lat: 40.4309669,
    lng: 17.4690898,
  },
  title: 'My marker',
  animation: google.maps.Animation.DROP,
  draggable: false,
};

var circle_data = {
  strokeColor: '#e1e6ed',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#e1e6ed',
  fillOpacity: 0.25,
  draggable: false,
  radius: 200
};

Mingmaps.Marker.create(marker_data,circle_data,
   (marker,circle) => {
    //operation on marker or circle
   }
);
```
