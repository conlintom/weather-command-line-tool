
const React = require('react');
const {render, Box, Color, Text} = require('ink');
const axios = require('axios');
const program = require('commander');

// todo - ticker


// create color map to hold colors
const colorMap  = {
    header: [173, 171, 171],
    freezing: [153, 0, 153], 
    cold: [41, 168, 242], 
    mild: [37, 232, 76], 
    hot: [255, 0, 0]
};


class WeatherBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            periods: [],
        };
    }

    formatOutput(temp, type, time, measure, speed, detail, headerColor, textColor){
       return(
        <Box textWrap = 'wrap' padding = {2}> 
                <Color rgb={headerColor}>   
                    <Text bold>{'The'} {type} {time} {'temperature is: \n'}</Text>
                </Color>
                <Color rgb={textColor}>
                    {temp} degrees {measure}{'\n'}
                </Color>
                <Color rgb={headerColor}>
                    <Text bold>{'The wind speed is:'}{'\n'}</Text>
                </Color>
                <Color rgb={textColor}>
                    {speed}{'\n'}
                </Color>
                <Color rgb={headerColor}>
                    <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                </Color>
                <Color rgb={textColor}>
                    {detail}
                </Color>
            </Box>
       );
    }

    render() {
        const periods = this.state.periods;
        // if periods isn't 0 length - strigify the first element of periods, otherwise indicate that the 
        // request is loading.
        
        // Check if periods has values
        if (!periods.length){
            return (
                <Box>
                    Loading...
                </Box>
            );
        }

        // Get the temperature, windspeed, time of day, and detailed forcast
        const perObj = periods[0];
        const timeDay = (perObj[Object.keys(perObj)[4]] == true) ? 'day time' : 'night time';
        const tempMeasure = perObj[Object.keys(perObj)[6]];
        const temp = perObj[Object.keys(perObj)[5]];
        const windSpeed = perObj[Object.keys(perObj)[8]];
        const detailForecast = perObj[Object.keys(perObj)[12]];

        const freezing = 32;
        const cold = 40;
        const mild = 70;
        let tempType = '';

        // Assign tempType
        (temp <= freezing) ? tempType = 'freezing' : tempType;
        (temp <= cold && temp > freezing) ? tempType = 'cold' : tempType;
        (temp >= cold && temp < mild) ? tempType = 'mild': tempType;
        (temp > mild) ? tempType = 'hot' : tempType;

        return(
            this.formatOutput(temp, tempType, timeDay, tempMeasure, windSpeed, detailForecast, colorMap.header, colorMap[tempType])
        );
        /*
        // Freezing condition
        if (temp <= freezing) {
            return(
                <Box textWrap = 'wrap' padding = {2}> 
                    <Color rgb={colorMap.header}>   
                        <Text bold>{'The'} {timeDay} {'temperature is freezing:\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.freezing}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.freezing}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.freezing}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Cold condition
        } else if (temp <= cold && temp > freezing) {
            return(
                <Box textWrap = "wrap" padding = {2}>
                    <Color rgb={colorMap.header}>   
                        <Text bold>{'The'} {timeDay} {'temperature is cold:\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.cold}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.cold}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.cold}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Mild condition
        } else if (temp >= cold && temp < mild ) {
            return(
                <Box textWrap = "wrap" padding = {3}>
                    <Color rgb={colorMap.header}>   
                        <Text bold>{'The'} {timeDay} {'temperature is mild:\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.mild}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.mild}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.mild}>
                        {detailForecast}
                    </Color>
                </Box>
            );
        // Hot condition
        } else if (temp > mild) {
            return(
                <Box textWrap = "wrap" padding = {2}>
                    <Color rgb={colorMap.header}>   
                        <Text bold>{'The'} {timeDay} {'temperature is hot:\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.hot}>
                        {temp} degrees {tempMeasure}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The windspeed is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.hot}>
                        {windSpeed}{'\n'}
                    </Color>
                    <Color rgb={colorMap.header}>
                        <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
                    </Color>
                    <Color rgb={colorMap.hot}>
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
        */       
    }
    componentDidMount() {
       // implemented commander
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

        // todo - wrap api call in a class - adapter
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