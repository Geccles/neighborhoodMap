var modelLoaded = false;
var modelWineries = ko.observableArray([]);
var filter = ko.observable('');
var openInfoBubble = null;
var currentMarker = null;
var weather = ko.observable('');
var temperature_string = ko.observable('');
var icon_url = ko.observable('');
var localStorage = null;

//This loads my data
var loadMyData = function() {
  var localStorage = lscache.get('modelWineries');
  console.log(localStorage);
  if (localStorage === null) {

    // API for winery list
    var settings = {
      "async": true,
      "crossDomain": true,
      dataType: "json",
      "url": "http://eccleshome.com/winery-project/api.php/wineries",
      "method": "GET"
    };

    var success = function(response) {
      clearTimeout(myTimeOut);
      for (var i = 0; i < response.length; i++) {
        modelWineries().push(response[i]);
      }
      lscache.set('modelWineries', response, 3);
      modelLoaded = true;
    };

    var err = function(req, status, err) {
      clearTimeout(myTimeOut);
      alert("Sorry, this data is unable to load at this time.");
    };

    //if data doesn't load alert the viewer
    var myTimeOut = setTimeout(function() {
      alert('Sorry, We were unable to retrieve this data. Please check your wifi...I bet it is not on.');
    }, 3000);

    var req = $.ajax(settings);

    req.done(success);
    req.fail(err);
  } else {
    for (var i = 0; i < localStorage.length; i++) {
      modelWineries().push(localStorage[i]);
    }
    modelLoaded = true;
  }
}();

//click on a winery in the wine list goes to the marker
var clickWine = function() {
  this.clickMarker();
};

//filter box
var filteredItems = ko.computed(function() {
  var myFilter = filter().toLowerCase();
  if (!myFilter || myFilter === "") {
    return modelWineries();
  } else {
    return ko.utils.arrayFilter(modelWineries(), function(item) {
      //returns the names only that match that filter string
      return (item.name.toLowerCase().indexOf(myFilter) > -1);
    });
  }
}, modelWineries, {
  deferEvaluation: true
});

//removes marker when filtered
filteredItems.subscribe(function(newList) {

  for (var i = 0; i < modelWineries().length; i++) {
    modelWineries()[i].marker.setVisible(false);
  }
  for (var j = 0; j < newList.length; j++) {
    newList[j].marker.setVisible(true);
  }
});

//weatherUndegroud api
var weatherWine = function() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.wunderground.com/api/4380142d7dffde3b/conditions/q/CA/Napa_Valley.json",
    "method": "GET",
  };

  var success = function(results) {
    if (!results.response.error) {
      var uri = results.current_observation.icon_url;
      var imageLink = '<img src="' + uri + '" alt="Weather icon">';
      weather(results.current_observation.weather);
      temperature_string(results.current_observation.temperature_string);
      icon_url(imageLink);
    } else {
      weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went wrong.");
    }
  };

  var err = function(req, status, err) {
    weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went TERRIBLY wrong.");
  };

  req = $.ajax(settings);

  req.done(success);
  req.fail(err);
};

//retrieves photos from foursquare from each winery
var photoWine = function(venueId, infoBubble, indexTab) {
  var prefix = "https://api.foursquare.com/v2/venues/";
  var suffix = "/photos?client_id=0G5RS5KJQLRKGBBO5WZUH1H1SNMWBNWBTENS03AKKAB0ZA30&client_secret=DCIZDOFW11PNDHPODTKNZFJI0YL0VKOC32FTXPMBYLEZJLN1&v=20130815";

  var uri = prefix + venueId + suffix;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": uri,
    "method": "GET",
    "error": function() {
      var contentString = "Sorry, we could not retrieve the photos at this time.";
      infoBubble.updateTab(indexTab, "Photos", contentString);
    }
  };

  var success = function(results) {
    var contentString = "";
    var count = results.response.photos.count;
    var prefix, suffix, uri;
    for (var i = 0; i < count; i++) {
      prefix = results.response.photos.items[i].prefix;
      suffix = results.response.photos.items[i].suffix;
      uri = prefix + "width300" + suffix;
      contentString += '<img src="' + uri + '" alt="Foursquare photo">';
      contentString += '<br>';
    }
    infoBubble.updateTab(indexTab, "Photos", contentString);
  };

  var err = function(req, status, err) {
    contentString = "Sorry, we could not retrieve the photos at this time.";
  };

  var req = $.ajax(settings);

  req.done(success);
  req.fail(err);
};

//AJAX statement to get Weather Underground key: bf48407e50740efb
var URL = "http://api.wunderground.com/api/bf48407e50740efb/conditions/q/CA/San_Francisco.json";

//this loads the map
var map;

var initMap = function() {
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
  var placeMarker = function(myLatLng, name, phoneNumber, address, website, venueId) {
    var marker = new google.maps.Marker({
      position: myLatLng,
      animation: google.maps.Animation.DROP,
      map: map,
      title: name,
      icon: image
    });

    //this makes an info Bubble for each marker
    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="firstHeading" class="firstHeading">' + name + '</h3>' + '</div>' +
      '<a href="' + website + '" class="website" target="_blank">' + website + '</a>' +
      '<h5 id="phoneNumber" class="number">' + phoneNumber + '</h5>' + '</div>' +
      '<h5 id="address" class="address1">' + address + '</h5>' + '</div>';

    //creating infobubble and style
    var infoBubble = new InfoBubble({
      minHeight: 250,
      maxHeight: 250,
      minWidth: 325,
      maxWidth: 400,
      borderRadius: 0,
      arrowStyle: 1,
      shadowStyle: 0,
      arrowPosition: 90,
      arrowSize: 0
    });

    //first tab for content on InfoBubble
    infoBubble.addTab('Winery', contentString);

    //second tab for photos on InfoBubble
    infoBubble.addTab('Photos', "Here are photos");
    photoWine(venueId, infoBubble, 1);

    //opens infoBubble
    marker.addListener('click', clickMarker);

    function clickMarker() {
      if (openInfoBubble) {
        openInfoBubble.close();
      }
      if (currentMarker) {
        currentMarker.setIcon('images/wine-icon-2.png');
      }
      marker.setIcon('images/wine-icon.png');
      positionMap(marker.getPosition(), 13);
      infoBubble.open(map, marker);
      openInfoBubble = infoBubble;
      currentMarker = marker;
    }

    //closes infoBubble
    infoBubble.addListener('closeclick', function() {
      if (openInfoBubble) {
        openInfoBubble.close();
      }
      marker.setIcon('images/wine-icon-2.png');
      openInfoBubble = null;
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
    return {
      "marker": marker,
      "clickMarker": clickMarker
    };
  };

  //this preps the markers to be made
  this.makeMarkers = function() {
    var newMarkerObj;
    for (var i = 0; i < modelWineries().length; i++) {
      newMarkerObj = placeMarker(new google.maps.LatLng(modelWineries()[i].latitude, modelWineries()[i].longitude), modelWineries()[i].name, modelWineries()[i].phoneNumber, modelWineries()[i].address, modelWineries()[i].website, modelWineries()[i].venueId);
      modelWineries()[i].marker = newMarkerObj.marker;
      modelWineries()[i].clickMarker = newMarkerObj.clickMarker;
    }
  };

};

if (localStorage) {
  console.log("localStorage is set");
  ko.applyBindings(initMap, document.getElementById('mapWine'));
  //loads weather
  weatherWine();
  makeMarkers();
} else {
console.log("localStorage not set");
  //checkes to see that ajax call completes then creates the markers
  $(document).ajaxComplete(function(event, xhr, settings) {
    if (settings.url === "http://eccleshome.com/winery-project/api.php/wineries") {
      ko.applyBindings(initMap, document.getElementById('mapWine'));
      //loads weather
      weatherWine();
      makeMarkers();
    }
  });
}

//Navigation Menu Slider
$(document).ready(function() {
  $('#nav-expander').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-expanded');
  });
  $('#nav-close').on('click', function(e) {
    e.preventDefault();
    $('body').removeClass('nav-expanded');
  });
});
