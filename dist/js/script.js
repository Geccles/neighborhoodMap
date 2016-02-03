var modelLoaded=!1,modelWineries=ko.observableArray([]),filter=ko.observable(""),openInfoBubble=null,currentMarker=null,weather=ko.observable(""),temperature_string=ko.observable(""),icon_url=ko.observable(""),localStorage=null,initialZoom=10,initialLatitude=38.460694,initialLongitude=-122.396604,townList=ko.observableArray([{name:"Calistoga"},{name:"Napa"},{name:"Pope Valley"},{name:"Rutherford"},{name:"St. Helena"},{name:"All"}]),selectedTown=ko.observable(""),wineryFilter=ko.observable(!0),windowWidth=$(window).width(),windowHeight=$(window).height(),loadMyData=function(){var e=lscache.get("modelWineries");if(null===e){var i={async:!0,crossDomain:!0,dataType:"json",url:"http://eccleshome.com/winery-project/api.php/wineries",method:"GET"},o=function(e){clearTimeout(r);for(var i=0;i<e.length;i++)modelWineries().push(e[i]);lscache.set("modelWineries",e,1),modelLoaded=!0,mapReady()},n=function(e,i,o){clearTimeout(r),alert("Sorry, this data is unable to load at this time.")},r=setTimeout(function(){alert("Sorry, We were unable to retrieve this data. Please check your wifi...I bet it is not on.")},3e3),t=$.ajax(i);t.done(o),t.fail(n)}else{for(var a=0;a<e.length;a++)modelWineries().push(e[a]);modelLoaded=!0,mapReady()}},clickWine=function(){this.clickMarker()},clickTown=function(){selectedTown(this.name),wineryFilter(!1)},filteredItems=ko.computed(function(){wineryFilter(!0);var e=filter().toLowerCase();return e&&""!==e?ko.utils.arrayFilter(modelWineries(),function(i){return i.name.toLowerCase().indexOf(e)>-1}):modelWineries()},modelWineries,{deferEvaluation:!0});filteredItems.subscribe(function(e){for(var i=0;i<modelWineries().length;i++)modelWineries()[i].marker.setVisible(!1);for(var o=0;o<e.length;o++)e[o].marker.setVisible(!0)});var filteredTowns=ko.computed(function(){var e;if("All"===selectedTown()){for(e=0;e<modelWineries().length;e++)modelWineries()[e].marker.setVisible(!0);return wineryFilter(!0),modelWineries()}var i=[];for(e=0;e<modelWineries().length;e++)modelWineries()[e].marker.setVisible(!1);for(var o=0;o<modelWineries().length;o++)modelWineries()[o].address.indexOf(selectedTown())>-1&&(modelWineries()[o].marker.setVisible(!0),i.push(modelWineries()[o]));return i},modelWineries,{deferEvaluation:!0}),weatherWine=function(){var e={async:!0,crossDomain:!0,url:"http://api.wunderground.com/api/4380142d7dffde3b/conditions/q/CA/Napa_Valley.json",method:"GET"},i=function(e){if(e.response.error)weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went wrong.");else{var i=e.current_observation.icon_url,o='<img class="img-responsive" src="'+i+'" alt="Weather icon">';weather(e.current_observation.weather),temperature_string(e.current_observation.temperature_string),icon_url(o)}},o=function(e,i,o){weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went TERRIBLY wrong.")};req=$.ajax(e),req.done(i),req.fail(o)},photoWine=function(e,i,o){var n="width300";800>windowWidth&&(n="width100"),375>windowWidth&&(n="width66");var r="https://api.foursquare.com/v2/venues/",t="/photos?client_id=0G5RS5KJQLRKGBBO5WZUH1H1SNMWBNWBTENS03AKKAB0ZA30&client_secret=DCIZDOFW11PNDHPODTKNZFJI0YL0VKOC32FTXPMBYLEZJLN1&v=20130815",a=r+e+t,s={async:!0,crossDomain:!0,url:a,method:"GET",error:function(){var e="Sorry, we could not retrieve the photos at this time.";i.updateTab(o,"Photos",e)}},l=function(e){for(var r,t,a,s="",l=e.response.photos.count,d=0;l>d;d++)r=e.response.photos.items[d].prefix,t=e.response.photos.items[d].suffix,a=r+n+t,s+='<img src="'+a+'" alt="Foursquare photo">',s+="<br><br>";i.updateTab(o,"<span class='wineTab'>Photos</span>",s)},d=function(e,i,o){contentString="Sorry, we could not retrieve the photos at this time."},m=$.ajax(s);m.done(l),m.fail(d)},URL="http://api.wunderground.com/api/bf48407e50740efb/conditions/q/CA/San_Francisco.json",map,initMap=function(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:initialLatitude,lng:initialLongitude},zoom:initialZoom,disableDefaultUI:!1,streetViewControl:!1,mapTypeControl:!1}),map.setMapTypeId(google.maps.MapTypeId.TERRAIN);var e="images/wine-icon-2.png",i=function(i,o,n,r,t,a){function s(){openInfoBubble&&openInfoBubble.close(),currentMarker&&currentMarker.setIcon("images/wine-icon-2.png"),l.setIcon("images/wine-icon.png"),h(l.getPosition(),13),u.open(map,l),openInfoBubble=u,currentMarker=l}var l=new google.maps.Marker({position:i,animation:google.maps.Animation.DROP,map:map,title:o,icon:e}),d=r.split(","),m='<div id="contentWinery"><div id="siteNotice"><p><a href="'+t+'" class="website" target="_blank">'+o+'</a></p><p class="number">'+n+'</p></div><p class="address1">'+d[0]+'</p><p class="address2">'+d[1]+","+d[2]+"</div>",c=.4*windowWidth;windowWidth>800&&(c=.25*windowWidth);var p=.5*windowHeight;windowHeight>600&&(p=.25*windowHeight);var u=new InfoBubble({minHeight:p,maxHeight:p,minWidth:c,maxWidth:c,borderRadius:0,arrowStyle:1,shadowStyle:0,arrowPosition:90,arrowSize:0});u.addTab('<span class="wineTab">Winery</span>',m),u.addTab("Photos","Here are photos"),photoWine(a,u,1),l.addListener("click",s),u.addListener("closeclick",function(){openInfoBubble&&openInfoBubble.close(),l.setIcon("images/wine-icon-2.png"),openInfoBubble=null,map.setCenter(new google.maps.LatLng(initialLatitude,initialLongitude)),map.setZoom(initialZoom)});var h=function(e,i){void 0!==i&&map.setZoom(i),map.setCenter(e),google.maps.event.trigger(map,"resize")};return{marker:l,clickMarker:s}};this.makeMarkers=function(){for(var e,o=0;o<modelWineries().length;o++)e=i(new google.maps.LatLng(modelWineries()[o].latitude,modelWineries()[o].longitude),modelWineries()[o].name,modelWineries()[o].phoneNumber,modelWineries()[o].address,modelWineries()[o].website,modelWineries()[o].venueId),modelWineries()[o].marker=e.marker,modelWineries()[o].clickMarker=e.clickMarker}};mapReady=function(){modelLoaded?(ko.applyBindings(initMap,document.getElementById("mapWine")),weatherWine(),makeMarkers()):$(document).ajaxComplete(function(e,i,o){"http://eccleshome.com/winery-project/api.php/wineries"===o.url&&(ko.applyBindings(initMap,document.getElementById("mapWine")),weatherWine(),makeMarkers())})},googleError=function(){alert("Error loading google map")};