require('import-jsx');
const React = require('react');
const {render, Box, Color} = require('ink');
const axios = require('axios');


class WeatherBar extends React.Component {
    constructor(props, lat, lon) {
        super(props, lat, lon);

        this.lat = lat;
        this.lon = lon;

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
        // 42.349327, -71.048720
        let latitude = this.lat;
        let longitude = this.lon;

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

render(<WeatherBar/>);

module.exports = WeatherBar;