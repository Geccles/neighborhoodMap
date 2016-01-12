var modelLoaded = false;
var modelWineries = [];
var openInfoWindow = null;

// API for winery list
var settings = {
  "async": true,
  "crossDomain": true,
  dataType: "json",
  "url": "http://eccleshome.com/winery-project/api.php/wineries",
  "method": "GET"
};

$.ajax(settings).done(function(response) {
  //console.log(response);
  for (var i = 0; i < response.length; i++) {
    modelWineries.push(response[i]);
  }
  modelLoaded = true;
});

//AJAX statement to get Weather Underground key: bf48407e50740efb
var URL = "http://api.wunderground.com/api/bf48407e50740efb/conditions/q/CA/San_Francisco.json";

//this loads the map
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.5000,
      lng: -122.3200
    },
    zoom: 10,
    disableDefaultUI: false
  });
  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  //this creates a marker with a letter inside it

  var image = 'images/wine-icon-2.png';
  var placeMarker = function(myLatLng, name, phoneNumber, address, website) {
    var marker = new google.maps.Marker({
      position: myLatLng,
      animation: google.maps.Animation.DROP,
      map: map,
      title: name,
      icon: image
    });

    //this makes an info window for each marker
    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="firstHeading" class="firstHeading">' + name + '</h3>' + '</div>' +
      '<a href= class="website">' + website + '</a>' +
      '<h5 id="phoneNumber" class="number">' + phoneNumber + '</h5>' + '</div>' +
      '<h5 id="address" class="address1">' + address + '</h5>' + '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    //opens infowindow
    marker.addListener('click', function() {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      marker.setIcon('images/wine-icon.png');
      positionMap(marker.getPosition(), 13);
      infoWindow.open(map, marker);
      openInfoWindow = infoWindow;
    });

    //closes infowindow
    infoWindow.addListener('closeclick', function() {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      marker.setIcon('images/wine-icon-2.png');
      openInfoWindow = null;
      map.setCenter(new google.maps.LatLng(38.5000, -122.3200));
      map.setZoom(10);
    });

    /* method to center map based on the location*/
    var positionMap = function(location, zoom) {
      if (zoom !== undefined) {
        map.setZoom(zoom);
      }
      map.setCenter(location);
      google.maps.event.trigger(map, 'resize');
    };
  };

  //this preps the markers to be made
  var makeMarkers = function() {
    for (var i = 0; i < modelWineries.length; i++) {
      placeMarker(new google.maps.LatLng(modelWineries[i].latitude, modelWineries[i].longitude), modelWineries[i].name, modelWineries[i].phoneNumber, modelWineries[i].address, modelWineries[i].website);
    }
  };

  //checkes to see that ajax call completes
  $(document).ajaxComplete(function(event, xhr, settings) {
    if (settings.url === "http://eccleshome.com/winery-project/api.php/wineries") {
      makeMarkers();
    }
  });
}
