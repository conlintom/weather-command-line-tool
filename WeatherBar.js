const React = require('react');
const {render, Box, Color} = require('ink');
const axios = require('axios');
const program = require('commander');

/*
const appInsights = require('applicationinsights');

appInsights.setup('b7fb2146-278b-489d-984a-ee1650b824b7').start();

const telemetry = appInsights.defaultClient;

let date = new Date();
let currentSeconds = date.getSeconds();

if(currentSeconds > 30) {
    telemetry.trackEvent({name: "Program One Executed"});
} else {
    telemetry.trackEvent({name: "Program Two Executed"});
}


let start = new Date()
let simulateTime = 1000

setTimeout(function(argument) {
  // execution time simulated with setTimeout function
  let end = new Date() - start

*/

class WeatherBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            periods: [],
        };
    }
    render() {
        const periods = this.state.periods;
        const notRecieved = "Loading"
        // if periods isn't 0 length - strigify the first element of periods, otherwise indicate that the 
        // request is loading. 
        const latest = periods.length ? JSON.stringify(periods[0], null, 2) : notRecieved;
        return (
            <Box>
                <Color green>   
                    The weather is:  
                </Color>
                <Color blue>
                    {latest}
                </Color>
            </Box>
        );   
    }
    componentDidMount() {
        // implement commander and take latidude and longitude variables from here
        program
            .version('0.1.0')
            .description('An application for current weather')
            .option('-a, --latitude [lat]', 'Add latitude')
            .option('-b, --longitude [lon]', 'Add longitude')
            .parse(process.argv);

        let lat = program.latitude;
        let lon = program.longitude;

        // create defaults if the values aren't filled out
        // Note commander doesn't currently accept the dash or negatives

        const defaultLat = 42.349295;
        const defaultLon = -71.048731;
        const latitude = program.latitude == true ? lat : defaultLat;
        const longitude = program.longitude == true ? lon : defaultLon;

        let self = this;

        // use axios to make the request to the weather api
        axios.get("https://api.weather.gov/points/" + latitude + "," + longitude + "/forecast")
            .then(function (res) {
                // get the weather information for the current time period
                //console.log(res.data.properties.periods[0]);
                self.setState({
                    periods: res.data.properties.periods
                });
            })
            // catch request errors
            .catch(function (err) {
                console.log(err);
            });
    }
    
}   

render(<WeatherBar/>)
/*
telemetry.trackEvent("Signal Processed", end);
console.log(end);
}, simulateTime);
*/