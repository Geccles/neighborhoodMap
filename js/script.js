
function loadData()
{
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    console.log(address);

    $greeting.text('So, you want to live at' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + ' ';
    var appendMsg = '<img class="bgimg" src= "' + streetviewUrl + '" >';
    console.log(appendMsg);
    $body.append('<img class="bgimg" src= "' + streetviewUrl + '" >');

    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&api-key=eeaee8614076b91d1e6e6b2e330ef4e1:9:36098306";


//AJAX statement to get Weather Underground key: bf48407e50740efb



  var URL = "http://api.wunderground.com/api/bf48407e50740efb/conditions/q/CA/San_Francisco.json";

//AJAX statement to get the NY Times Article
    $.getJSON(URL, function(data)
    {
      var list = [];
      console.log(data);
      var articles = data.response.docs;
      for (var i = 0; i < 10; i++)
    {
        var article = articles[i];

        list.push("<li>" + '<a href="'+ article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + "</li>");
    }
      $nytHeaderElem.append(list);
    }).error(function(e)
    {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });


//AJAX request to get Wikipedia links
  var wikiUrl = 'http://en.wikiabcdefgpedia.org/w/api.php?action=opensearch&search= ' + cityStr + ' &format=json&callback=wikiCallback';
  var wikiRequestTimeout = setTimeout(function()
  {
    $wikiElem.text("Failed to Get Wikipedia Resources");
  }, 500);
  $.ajax(
    {
      url: wikiUrl,
      dataType: "jsonp",
      //jsnop: "callback",
      success: function (response)
      {
        var articleList = response[1];

        for (var i = 0; i < articleList.length; i++)
        {
          articleStr = articleList[i];
          var url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href= "' + url +'" >' + articleStr + '</a></li>');
        }
          clearTimeout(wikiRequestTimeout);
      }
    });
      return false;
}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.5000, lng: -122.3200},
    zoom: 10,
    disableDefaultUI: true
  });
}

$('#form-container').submit(loadData);
