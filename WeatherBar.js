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
        let per1 = periods.length ? periods[0] : notRecieved;
        if (typeof per1 == 'string') console.log('string', per1);
        if (typeof per1 == 'object') console.log('object', per1[Object.keys(per1)[5]]);
        return(
            <Box>
                Box
            </Box>
        );
        /*
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
        */
          
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