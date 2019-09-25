const React = require('react');
const {render, Box, Color, Text} = require('ink');
const program = require('commander');
const weather = require('./../weather-data/index.js')

// todo - ticker

const colorMap  = {
    header: [173, 171, 171],
    freezing: [153, 0, 153], 
    cold: [41, 168, 242], 
    mild: [37, 232, 76], 
    hot: [255, 0, 0],
    error: [255, 12, 12]
};

/*
function displayWeather(temp, type, min, max, pressure, hubmidity, descrp, icon, perCloudy, city, speed, date, lat, lon) {
    // TODO: reformat for new API/data
    return(
         <Box textWrap = 'wrap' padding = {2}> 
             <Color rgb={colorMap.header}>   
                 <Text bold>{'The weather on'} {date} {'for'} {city} {'('} {lat} {','} {lon} {') \n'}</Text>
             </Color>
             
         </Box>
    );
 }
 */

function displayWeather(perObj) {
    // TODO: reformat for new API/data
    return(
         <Box textWrap = 'wrap' padding = {2}>  
            <Text bold>{perObj}</Text>             
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
            <Text bold>Loading... </Text>
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
                <Box>
                    <Text bold>Loading... </Text>
                </Box>
            );
        }
        
        return(
            <div>
                {periods[0].dt_txt}
                {periods[0].main.temp}
            </div>
                
        );

        /*
        const temp = perObj.list[0].main.temp;
        const tempMin = perObj.list[0].main.temp_min;
        const tempMax = perObj.list[0].main.temp_max;
        const pressure = perObj.list[0].main.pressure;
        const humidity = perObj.list[0].main.humidity;
        const description = perObj.list[0].weather[0].description;
        const icon = perObj.list[0].weather[0].icon;
        const percentCloudy = perObj.list[0].clouds.all;
        const city = perObj.city.name;
        const windSpeed = perObj.list[0].wind.speed;
        const weatherDate = perObj.list[0].dt_txt;
        const lat = perObj.city.coord.lat;
        const lon = perObj.city.coord.lon;

        const freezing = 32;
        const cold = 40;
        const mild = 70;
        let tempType = '';

        (temp <= freezing) ? tempType = 'freezing' : tempType;
        (temp <= cold && temp > freezing) ? tempType = 'cold' : tempType;
        (temp >= cold && temp <= mild) ? tempType = 'mild': tempType;
        (temp > mild) ? tempType = 'hot' : tempType;

        return(
           displayWeather(temp, tempMin, tempMax, tempType, pressure, humidity, description, icon, percentCloudy, city, windSpeed, weatherDate, lat, lon)
        );
        */

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
                    periods: res.list
                });
            })
            .catch(err => {
                const objErr = err;
                displayError(objErr);
            });
    }
}

render(<WeatherBar/>)