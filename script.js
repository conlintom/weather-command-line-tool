
// use axios
const axios = require("axios");

// latitude and logitude variables
var lat = "39.7456";
var lon = "-97.0892";

// use axios to make the request
var result = axios.get("https://api.weather.gov/points/" + lat + "," + lon + "/forecast")
  .then(function (result) {
    // get the weather information for today
    console.log(result.data.properties.periods[0]);
  })
  // catch request errors
  .catch(function (error) {
    console.log(error);
  });