const React = require('react');
const {render, Box, Color} = require('ink');
const axios = require('axios');
const program = require('commander');

class WeatherBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            periods: [],
        };
    }
    render() {
        const periods = this.state.periods;
        const notRecieved = 'Loading'
        // if periods isn't 0 length - strigify the first element of periods, otherwise indicate that the 
        // request is loading. 

        // Get the entire detail for the current weather
        const latest = periods.length ? JSON.stringify(periods[0], null, 2) : notRecieved;
        // Get the temperature to color the data
        const temp = periods.length ? periods[0] : notRecieved;
        // Cold condition
        if (temp < 40) {
            return(
                <Box>
                    <Color rgb={[166, 168, 167]}>   
                        The weather is:  
                    </Color>
                    <Color blue>
                        {latest}
                    </Color>
                </Box>
            );
        // mild condition
        } else if (temp > 40 && temp < 70 ) {
            return(
                <Box>
                    <Color rgb={[166, 168, 167]}>   
                        The weather is:  
                    </Color>
                    <Color rgb={[234, 7, 7]}>
                        {latest}
                    </Color>
                </Box>
            );
        // Hot condition
        } else {
            return(
                <Box>
                    <Color rgb={[166, 168, 167]}>   
                        The weather is:  
                    </Color>
                    <Color rgb={[1, 178, 69]}>
                        {latest}
                    </Color>
                </Box>
            );
        }
          
    }
    componentDidMount() {
        // implement commander and take latidude and longitude variables from here
        // set default lat lon here

        program
            .version('0.1.0')
            .description('An application for current weather')
            .option('-a, --latitude <decimal>', 'Add latitude to be searched', '42.349295')
            .option('-b, --longitude <decimal>', 'Add longitude to be searched', '-71.048731')
        
        program.parse(process.argv);

        let lat = program.latitude;
        let lon = program.longitude;

        let self = this;

        // use axios to make the request to the weather api - promise
        axios.get("https://api.weather.gov/points/" + lat + "," + lon + "/forecast")
            .then(function (res) {
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