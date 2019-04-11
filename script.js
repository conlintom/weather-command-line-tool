

// Create the resquest object
var request = new XMLHttpRequest(); 

// Create the lat lon variables
// Take these from the user (command line) in the future
var lat = 42.349200
var lon = -71.04848

// open the request to the weather services API using the /points/lat,lon/forecast function
request.open("GET", "https://api.weather.gov/points/" + lat + "," + lon + "/forecast", true);

// When the page loads
request.onload = function() {
    var data = JSON.parse(this.response);
    var periods = data.properties.periods;
    //console.log(Array.isArray(periods));
    //console.log(periods.length)
    console.log(periods);
    // Check the request status
    if (request.status >= 200 && request.status < 400){
        for (var i = 0; i < periods.length; i++ ){
            var per = periods[i]
            console.log(per.detailedForecast);
        }
    } else {
        console.log("It's not working!");
    }
}

request.send();