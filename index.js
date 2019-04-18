// use axios
const axios = require("axios");
const ink = require("ink");
const react = require("react");
const reactDOM = require("react-dom/server");

// console.log(react);
// console.log(ink);
console.log(reactDOM);

class MyComponent extends react.Component{
    render() {
        return <div>Hello World</div>;
    }
}
ReactDOM.reenderToString(<MyComponent/>, node);


// latitude and logitude variables
let lat = "39.7456";
let lon = "-97.0892";

// use axios to make the request to the weather api
axios.get("https://api.weather.gov/points/" + lat + "," + lon + "/forecast")
  .then(function (res) {
    // get the weather information for the current time period
    //console.log(res.data.properties.periods[0]);
  })
  // catch request errors
  .catch(function (err) {
    console.log(err);
  });