const React = require('react');
const {render, Box, Color, Text} = require('ink');
const axios = require('axios');


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
        // split the string on 
        // const perParse = (latest == notRecieved) ? "" : latest.split(",");
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
        // latitude and logitude variables
        let lat = "39.7456";
        let lon = "-97.0892";

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