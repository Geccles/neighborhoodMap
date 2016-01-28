## Udacity Neighborhood Map: Project 5

This project consists of implementing Google Maps API on a single page along with three other API's that coherently and seamlessly function as a web application.
I decided to create my own API that holds a list of Winery's in Napa Valley, CA.
Along with creating my own API, I've included calls to the WeatherUnderground API and Foursquare API.

The app interacts with the user in the following ways:

1. You can filter through the Winery's in the Search box.
    - This will start removing the wine markers that do not match the filter search.
2. You can click on a winery name in the Winery list that is scrollable.
    - Once clicked the map will zoom in and the info bubble will pop up.
3. The info bubble's first tab "Winery" holds a winery name that can be clicked to link to the winery's website in a new tab.
    - The winery's phone number and address is also listed.
    - The second tab "Photos" display up to 30 photos if the Winery has them from Foursquare in a scrollable list.


### Live Demo

[Wine About It](http://verdantshades.com/neighborhoodmap/)

### Installation
1. Download the repository
2. The compiled webapp is in the dist folder
3. Open index.html in a browser

### Build From The Project's Root

- $ `npm install`
- $ `gulp`

### Resources

- [knockout.js](http://knockjs.com)
- [Google Maps](https://developers.google.com/maps/?hl=en)
- [jQuery](https://jquery.com/)
- [lscache](https://github.com/pamelafox/lscache)
- [Foursquare API](https://developer.foursquare.com/)
- [Map icons](https://mapicons.mapsmarker.com/)
- [WeatherUnderground](http://www.wunderground.com/weather/api/d/docs?d=index)
- [Creating a Simple REST API in PHP](https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/)
