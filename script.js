
// use axios
const axios = require("axios");


// use axios to make the request
var result = axios.get('https://api.weather.gov/points/39.7456,-97.0892/forecast')
  .then(function (result) {
    console.log(result.data.properties.periods[0]);
  })
  .catch(function (error) {
    console.log(error);
  });