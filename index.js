
// require('import-jsx')('./WeatherBar');

const lat = process.argv[0];
const lon = process.argv[1];

const weatherBar = require('import-jsx')('./WeatherBar');

weather = new weatherBar(lat, lon);