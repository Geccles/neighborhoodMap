var modelLoaded = false;
var modelWineries = ko.observableArray([]);
var filter = ko.observable('');
var openInfoBubble = null;
var currentMarker = null;
var weather = ko.observable('');
var temperature_string = ko.observable('');
var icon_url = ko.observable('');
var localStorage = null;
var initialZoom = 10;
var initialLatitude = 38.460694;
var initialLongitude = -122.396604;
var townList = ko.observableArray([{
  name: 'Calistoga'
}, {
  name: 'Napa'
}, {
  name: 'Pope Valley'
}, {
  name: 'Rutherford'
}, {
  name: 'St. Helena'
}, {
  name: 'All'
}]);
var selectedTown = ko.observable('All');
var wineryFilter = ko.observable(true);

// Returns width of browser viewport
var windowWidth = $(window).width();
var windowHeight = $(window).height();

//This loads my data
var loadMyData = function() {

  var localStorage = lscache.get('modelWineries');
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
      lscache.set('modelWineries', response, 1);
      modelLoaded = true;
      mapReady();
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
    mapReady();
  }
};

//click on a winery in the wine list goes to the marker
var clickWine = function() {
  this.clickMarker();
};

//dropdown for towns
var clickTown = function() {
  if (this.name !== selectedTown()) {
    selectedTown(this.name);
    wineryFilter(false);
  }
};

//filter box
var filteredItems = ko.computed(function() {
  wineryFilter(true);
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

//filter Towns
var filteredTowns = ko.computed(function() {
  var i;

  if (selectedTown() === 'All') {
    for (i = 0; i < modelWineries().length; i++) {
      modelWineries()[i].marker.setVisible(true);
    }
    wineryFilter(true);
    return modelWineries();
  }
  var newList = [];

  for (i = 0; i < modelWineries().length; i++) {
    modelWineries()[i].marker.setVisible(false);
  }
  for (var j = 0; j < modelWineries().length; j++) {
    if (modelWineries()[j].address.indexOf(selectedTown()) > -1) {
      modelWineries()[j].marker.setVisible(true);
      newList.push(modelWineries()[j]);
    }
  }

  return newList;
}, modelWineries, {
  deferEvaluation: true
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
      var imageLink = '<img class="img-responsive" src="' + uri + '" alt="Weather icon">';
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
  var photoWidth = "width300";
  if (windowWidth < 800) {
    photoWidth = "width100";
  }
  if (windowWidth < 375) {
    photoWidth = "width66";
  }

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
      uri = prefix + photoWidth + suffix;
      contentString += '<img src="' + uri + '" alt="Foursquare photo">';
      contentString += '<br><br>';
    }
    infoBubble.updateTab(indexTab, "<span class='wineTab'>Photos</span>", contentString);
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
      lat: initialLatitude,
      lng: initialLongitude
    },
    zoom: initialZoom,
    disableDefaultUI: false,
    streetViewControl: false,
    mapTypeControl: false
  });
  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);

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
    var addressArray = address.split(',');
    var contentString = '<div id="contentWinery">' +
      '<div id="siteNotice">' +
      '<p>' +
      '<a href="' + website + '" class="website" target="_blank">' + name + '</a>' +
      '</p>' +
      '<p class="number">' + phoneNumber + '</p>' + '</div>' +
      '<p class="address1">' + addressArray[0] + '</p>' +
      '<p class="address2">' + addressArray[1] + ',' + addressArray[2] + '</div>';

    //creating infobubble and style
    var maxWidths = windowWidth * 0.4;
    if (windowWidth > 800) {
      maxWidths = windowWidth * 0.25;
    }
    var maxHeights = windowHeight * 0.5;
    if (windowHeight > 600) {
      maxHeights = windowHeight * 0.25;
    }

    var infoBubble = new InfoBubble({
      minHeight: maxHeights,
      maxHeight: maxHeights,
      minWidth: maxWidths,
      maxWidth: maxWidths,
      borderRadius: 0,
      arrowStyle: 1,
      shadowStyle: 0,
      arrowPosition: 90,
      arrowSize: 0
    });

    //first tab for content on InfoBubble
    infoBubble.addTab('<span class="wineTab">Winery</span>', contentString);

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
      map.setCenter(new google.maps.LatLng(initialLatitude, initialLongitude));
      map.setZoom(initialZoom);
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
mapReady = function() {
  //if initMap succeeds then this will run
  if (modelLoaded) {
    ko.applyBindings(initMap, document.getElementById('mapWine'));
    //loads weather
    weatherWine();
    makeMarkers();
  } else {
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
};

googleError = function() {
  alert("Error loading google map");
};
