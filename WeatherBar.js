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
        const freezing = 32;
        const cold = 40;
        const mild = 70;
        // Get the entire detail for the current weather
        const latest = periods.length ? JSON.stringify(periods[0], null, 2) : notRecieved;
        // Get the temperature to color the data
        const perObj = periods.length ? periods[0] : notRecieved;
        const temp = perObj[Object.keys(perObj)[5]]
        // freezing condition
        if (temp <= freezing) {
            return(
                <Box>
                    <Color rgb={[173, 171, 171]}>   
                        The temperature is freezing:   
                    </Color>
                    <Color blue>
                        {temp}
                    </Color>
                </Box>
            );
        }
        // Cold condition
        else if (temp <= cold && temp > freezing) {
            return(
                <Box>
                    <Color rgb={[173, 171, 171]}>   
                        The temperature is cold:  
                    </Color>
                    <Color blue>
                        {temp}
                    </Color>
                </Box>
            );
        // mild condition
        } else if (temp >= cold && temp < mild ) {
            return(
                <Box>
                    <Color rgb={[173, 171, 171]}>   
                        The temperature is mild: 
                    </Color>
                    <Color rgb={[37, 232, 76]}>
                        {temp}
                    </Color>
                </Box>
            );
        // Hot condition
        } else if (temp > mild) {
            return(
                <Box>
                    <Color rgb={[173, 171, 171]}>   
                        The temperature is hot: 
                    </Color>
                    <Color rgb={[255, 0, 0]}>
                        {temp}
                    </Color>
                </Box>
            );
        } else {
            return(
                <Box red>
                    Temperature Not Found!
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