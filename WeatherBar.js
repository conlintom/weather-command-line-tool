/*
Adapter Pattern
*/

const React = require('react');
const {render, Box, Color, Text} = require('ink');
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
        //const latest = periods.length ? JSON.stringify(periods[0], null, 2) : notRecieved;
        // Get the temperature to color the data
        const perObj = periods.length ? periods[0] : notRecieved;

        const dayTime = (perObj.length != 1) ? perObj[Object.keys(perObj)[4]] : notRecieved;
        const timeDay = (dayTime == true) ? 'day time' : 'night time';
        const tempMeasure = (perObj.length != 1) ? perObj[Object.keys(perObj)[6]] : notRecieved;
        const temp = (perObj.length != 1) ? perObj[Object.keys(perObj)[5]] : notRecieved;
        const windSpeed = (perObj.length != 1) ? perObj[Object.keys(perObj)[8]] : notRecieved;
        const detailForecast = (perObj.length != 1) ? perObj[Object.keys(perObj)[12]] : notRecieved;
        // Freezing condition
        if (temp <= freezing) {
            return(
                <Box textWrap = "wrap" padding = {2}> 
                    <Color rgb={[173, 171, 171]}>   
                        <Text bold>{'The'} {timeDay} {'temperature is freezing:\n'}</Text>
                    </Color>
                    <Color rgb={[153, 0, 153]}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[153, 0, 153]}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[153, 0, 153]}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Cold condition
        } else if (temp <= cold && temp > freezing) {
            return(
                <Box textWrap = "wrap" padding = {2}>
                    <Color rgb={[173, 171, 171]}>   
                        <Text bold>{'The'} {timeDay} {'temperature is cold:\n'}</Text>
                    </Color>
                    <Color blue>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color blue>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color blue>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Mild condition
        } else if (temp >= cold && temp < mild ) {
            return(
                <Box textWrap = "wrap" padding = {3}>
                    <Color rgb={[173, 171, 171]}>   
                        <Text bold>{'The'} {timeDay} {'temperature is mild:\n'}</Text>
                    </Color>
                    <Color rgb={[37, 232, 76]}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[37, 232, 76]}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[37, 232, 76]}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Hot condition
        } else if (temp > mild) {
            return(
                <Box textWrap = "wrap" padding = {2}>
                    <Color rgb={[173, 171, 171]}>   
                        <Text bold>{'The'} {timeDay} {'temperature is hot:\n'}</Text>
                    </Color>
                    <Color rgb={[255, 0, 0]}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[255, 0, 0]}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={[173, 171, 171]}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={[255, 0, 0]}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        } else {
            return(
                <Box red>
                    {temp}
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