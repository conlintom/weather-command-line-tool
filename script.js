
// use axios
const axios = require("axios");

// latitude and logitude variables
let lat = "39.7456";
let lon = "-97.0892";

// use axios to make the request to the weather api
axios.get("https://api.weather.gov/points/" + lat + "," + lon + "/forecast")
  .then(function (res) {
    // get the weather information for today
    console.log(res.data.properties.periods[0]);
  })
  // catch request errors
  .catch(function (err) {
    console.log(err);
  });