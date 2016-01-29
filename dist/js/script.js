var modelLoaded=!1,modelWineries=ko.observableArray([]),filter=ko.observable(""),openInfoBubble=null,currentMarker=null,weather=ko.observable(""),temperature_string=ko.observable(""),icon_url=ko.observable(""),localStorage=null,initialZoom=10,initialLatitude=38.460694,initialLongitude=-122.396604,windowWidth=$(window).width(),windowHeight=$(window).height(),loadMyData=function(){var e=lscache.get("modelWineries");if(null===e){var o={async:!0,crossDomain:!0,dataType:"json",url:"http://eccleshome.com/winery-project/api.php/wineries",method:"GET"},i=function(e){clearTimeout(r);for(var o=0;o<e.length;o++)modelWineries().push(e[o]);lscache.set("modelWineries",e,1),modelLoaded=!0,mapReady()},n=function(e,o,i){clearTimeout(r),alert("Sorry, this data is unable to load at this time.")},r=setTimeout(function(){alert("Sorry, We were unable to retrieve this data. Please check your wifi...I bet it is not on.")},3e3),t=$.ajax(o);t.done(i),t.fail(n)}else{for(var a=0;a<e.length;a++)modelWineries().push(e[a]);modelLoaded=!0,mapReady()}},clickWine=function(){this.clickMarker()},filteredItems=ko.computed(function(){var e=filter().toLowerCase();return e&&""!==e?ko.utils.arrayFilter(modelWineries(),function(o){return o.name.toLowerCase().indexOf(e)>-1}):modelWineries()},modelWineries,{deferEvaluation:!0});filteredItems.subscribe(function(e){for(var o=0;o<modelWineries().length;o++)modelWineries()[o].marker.setVisible(!1);for(var i=0;i<e.length;i++)e[i].marker.setVisible(!0)});var weatherWine=function(){var e={async:!0,crossDomain:!0,url:"http://api.wunderground.com/api/4380142d7dffde3b/conditions/q/CA/Napa_Valley.json",method:"GET"},o=function(e){if(e.response.error)weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went wrong.");else{var o=e.current_observation.icon_url,i='<img class="img-responsive" src="'+o+'" alt="Weather icon">';weather(e.current_observation.weather),temperature_string(e.current_observation.temperature_string),icon_url(i)}},i=function(e,o,i){weather("Sorry, WeatherUnderground is currently not working. Please try again later or let the developer know something went TERRIBLY wrong.")};req=$.ajax(e),req.done(o),req.fail(i)},photoWine=function(e,o,i){var n="width300";800>windowWidth&&(n="width100"),375>windowWidth&&(n="width66");var r="https://api.foursquare.com/v2/venues/",t="/photos?client_id=0G5RS5KJQLRKGBBO5WZUH1H1SNMWBNWBTENS03AKKAB0ZA30&client_secret=DCIZDOFW11PNDHPODTKNZFJI0YL0VKOC32FTXPMBYLEZJLN1&v=20130815",a=r+e+t,s={async:!0,crossDomain:!0,url:a,method:"GET",error:function(){var e="Sorry, we could not retrieve the photos at this time.";o.updateTab(i,"Photos",e)}},l=function(e){for(var r,t,a,s="",l=e.response.photos.count,d=0;l>d;d++)r=e.response.photos.items[d].prefix,t=e.response.photos.items[d].suffix,a=r+n+t,s+='<img src="'+a+'" alt="Foursquare photo">',s+="<br><br>";o.updateTab(i,"Photos",s)},d=function(e,o,i){contentString="Sorry, we could not retrieve the photos at this time."},m=$.ajax(s);m.done(l),m.fail(d)},URL="http://api.wunderground.com/api/bf48407e50740efb/conditions/q/CA/San_Francisco.json",map,initMap=function(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:initialLatitude,lng:initialLongitude},zoom:initialZoom,disableDefaultUI:!1,streetViewControl:!1,mapTypeControl:!1}),map.setMapTypeId(google.maps.MapTypeId.TERRAIN);var e="images/wine-icon-2.png",o=function(o,i,n,r,t,a){function s(){openInfoBubble&&openInfoBubble.close(),currentMarker&&currentMarker.setIcon("images/wine-icon-2.png"),l.setIcon("images/wine-icon.png"),h(l.getPosition(),13),u.open(map,l),openInfoBubble=u,currentMarker=l}var l=new google.maps.Marker({position:o,animation:google.maps.Animation.DROP,map:map,title:i,icon:e}),d=r.split(","),m='<div id="contentWinery"><div id="siteNotice"><p><a href="'+t+'" class="website" target="_blank">'+i+'</a></p><p class="number">'+n+'</p></div><p class="address1">'+d[0]+'</p><p class="address2">'+d[1]+","+d[2]+"</div>",c=.4*windowWidth;windowWidth>800&&(c=.25*windowWidth);var p=.5*windowHeight;windowHeight>600&&(p=.25*windowHeight);var u=new InfoBubble({minHeight:p,maxHeight:p,minWidth:c,maxWidth:c,borderRadius:0,arrowStyle:1,shadowStyle:0,arrowPosition:90,arrowSize:0});u.addTab("Winery",m),u.addTab("Photos","Here are photos"),photoWine(a,u,1),l.addListener("click",s),u.addListener("closeclick",function(){openInfoBubble&&openInfoBubble.close(),l.setIcon("images/wine-icon-2.png"),openInfoBubble=null,map.setCenter(new google.maps.LatLng(initialLatitude,initialLongitude)),map.setZoom(initialZoom)});var h=function(e,o){void 0!==o&&map.setZoom(o),map.setCenter(e),google.maps.event.trigger(map,"resize")};return{marker:l,clickMarker:s}};this.makeMarkers=function(){for(var e,i=0;i<modelWineries().length;i++)e=o(new google.maps.LatLng(modelWineries()[i].latitude,modelWineries()[i].longitude),modelWineries()[i].name,modelWineries()[i].phoneNumber,modelWineries()[i].address,modelWineries()[i].website,modelWineries()[i].venueId),modelWineries()[i].marker=e.marker,modelWineries()[i].clickMarker=e.clickMarker}};mapReady=function(){modelLoaded?(ko.applyBindings(initMap,document.getElementById("mapWine")),weatherWine(),makeMarkers()):$(document).ajaxComplete(function(e,o,i){"http://eccleshome.com/winery-project/api.php/wineries"===i.url&&(ko.applyBindings(initMap,document.getElementById("mapWine")),weatherWine(),makeMarkers())})},googleError=function(){alert("Error loading google map")};