const React = require('react');
const {render, Box, Color} = require('ink');
const axios = require('axios');
const appInsights = require('applicationinsights');

appInsights.setup('a3ac3032-ad4a-4a19-8f00-eef544b0a284').start();

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
                    Weather:  
                </Color>
                <Color blue>
                    {latest}
                </Color>
            </Box>
        );   
    }
    componentDidMount() {
        // latitude and logitude variables taken from process.argv
        // Take the last two elements from process.argv to get the latitude and longitude
        // defaultLat and defaultLon added if arguments are not supplied
        const defaultLat = 42.349295;
        const defaultLon = -71.048731;
        const lat = process.argv[2] == 'undefined' ? process.argv[2] : defaultLat;
        const lon = process.argv[3] == 'undefined' ? process.argv[3] : defaultLon;

        let self = this;
        
        // use axios to make the request to the weather api
        axios.get("https://api.weather.gov/points/" + lat + "," + lon + "/forecast")
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

render(<WeatherBar/>);

module.exports = WeatherBar;