const React = require('react');
const {render, Box, Color, Text} = require('ink');
const BigText = require('ink-big-text');
const InkBox = require('ink-box');
const program = require('commander');
const weather = require('./../weather-data/index.js')

const colorMap  = {
    header: [173, 171, 171],
    freezing: [153, 0, 153], 
    cold: [41, 168, 242], 
    mild: [37, 232, 76], 
    hot: [255, 0, 0],
    error: [255, 12, 12]
};


function displayWeather(perObj) {
    const perObjList = perObj.list
    
    return(
                  
        <Box flexDirection='column'>
            <BigText text='Weather Results'/>
            <Box paddingBottom={3}>
                {'\n'}Country/City: '/> {perObj.city.country} | {perObj.city.name} 
                {'\n'}Latitude: {perObj.city.coord.lat}
                {'\n'}Longitude: {perObj.city.coord.lon}
            </Box>
            {perObjList.map(item => ( 
                <Box paddingBottom={6} key={item.dt_txt}>
                    <Text bold><Color rgb={colorMap.header}>Date/Time:</Color> </Text>           <Color rgb={colorMap.mild}>{item.dt_txt}</Color>
                    {'\n'}
                    <Text bold><Color rgb={colorMap.header}>Temperatue:</Color> </Text>          <Color rgb={colorMap.mild}>{item.main.temp}</Color>
                    {'\n'}
                    <Text bold><Color rgb={colorMap.header}>Min Temperature:</Color> </Text>     <Color rgb={colorMap.mild}>{item.main.temp_min}</Color>
                    {'\n'}
                    <Text bold><Color rgb={colorMap.header}>Max Temperature:</Color> </Text>     <Color rgb={colorMap.mild}>{item.main.temp_max}</Color>
                    {'\n'}
                    <Text bold><Color rgb={colorMap.header}>Humidity:</Color> </Text>            <Color rgb={colorMap.mild}>{item.main.humidity}%</Color>
                    {'\n'}
                    <Text bold><Color rgb={colorMap.header}>Wind Speed:</Color> </Text>          <Color rgb={colorMap.mild}>{item.wind.speed}</Color>
                </Box>
            ))}
        </Box>
    );
 }

 function displaySummaryDetails(perObj) {
    const perObjList = perObj.list
    return(
        <Box flexDirection='column'>
            {perObjList.city}
        </Box>
    );
 }

 function displayError(errorMessage){
    return(
        <Box textWrap = 'wrap' padding = {2}>
            <Color rgb={colorMap.error}>
                <Text bold> {errorMessage} {'\n'} </Text>
            </Color>
        </Box>
    );
}

 function displayLoading(){
    return(
        <Box>
            <Text bold> Loading... </Text>
        </Box>
    );
}



class WeatherBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            periods: [],
        };
    }

    render() {
        const periods = this.state.periods;
        if (!Object.keys(this.state.periods).length){
            return( 
                displayLoading()
            );
        }

        return(
            // TODO - create function that displays high level details - city name etc.
            displayWeather(periods)
        );

    }
    componentWillMount() {
        program
            .version('0.1.0')
            .description('An application for current weather')
            .option('-x, --latitude <decimal>', 'Add latitude to be searched', '42.349295')
            .option('-y, --longitude <decimal>', 'Add longitude to be searched', '-71.048731')
            .option('-u, --units [string]', 'Units for results to be returned in', 'imperial')
            .option('-a, --apikey <string>', 'API Key for Request', '')
            .option('-t, --type [string]', 'Request type: US, global-current, global-weekly', 'global-current')

        program.parse(process.argv);

        let latitude = program.latitude;
        let longitude = program.longitude;
        let units = program.units;
        let apiKey = program.apikey;

        let self = this;
        
        weather.globalCoordinatesWeekly(latitude, longitude, apiKey, units)
            .then(res => {
                self.setState({
                    periods: res
                });
            })
            .catch(err => {
                const objErr = err;
                displayError(objErr);
            });
    }
}

render(<WeatherBar/>)