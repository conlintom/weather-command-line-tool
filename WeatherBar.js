const React = require('react');
const {render, Box, Color, Text} = require('ink');
const program = require('commander');
const weather = require('weather-data')

// todo - ticker

const colorMap  = {
    header: [173, 171, 171],
    freezing: [153, 0, 153], 
    cold: [41, 168, 242], 
    mild: [37, 232, 76], 
    hot: [255, 0, 0],
    error: [255, 12, 12]
};

function displayWeather(temp, type, time, measure, speed, detail) {
    // todo - add lines depending on the number of lines of the detailed forecast
    return(
         <Box textWrap = 'wrap' padding = {2}> 
             <Color rgb={colorMap.header}>   
                 <Text bold>{'The'} {type} {time} {'temperature is: \n'}</Text>
             </Color>
             <Color rgb={colorMap[type]}>
                 {temp} degrees {measure}{'\n'}
             </Color>
             <Color rgb={colorMap.header}>
                 <Text bold>{'The wind speed is:'}{'\n'}</Text>
             </Color>
             <Color rgb={colorMap[type]}>
                 {speed}{'\n'}
             </Color>
             <Color rgb={colorMap.header}>
                 <Text bold>{'The detailed forecast is:'}{'\n'}</Text>
             </Color>
             <Color rgb={colorMap[type]}>
                {detail}
                <Text> {'\n\n'} </Text>
             </Color>
         </Box>
    );
 }

 function displayError(errorMessage){
    return(
        <Box textWrap = 'wrap' padding = {2}>
            <Color rgb={colorMap.error}>
                <Text bold> {errorMessage.data['detail']} {'\n'} </Text>
                <Text bold> {'Status: '} {errorMessage.data['status']} {' Not Found \n'} </Text>
                <Text bold> Please make sure appropriate latitude and logitude values are requested and within the United States. </Text>
            </Color>
        </Box>
    );
}

 function displayLoading(){
    return(
        <Box>
            Loading...
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
        
        if (!periods.length){
            return (
                displayLoading()
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

        (temp <= freezing) ? tempType = 'freezing' : tempType;
        (temp <= cold && temp > freezing) ? tempType = 'cold' : tempType;
        (temp >= cold && temp <= mild) ? tempType = 'mild': tempType;
        (temp > mild) ? tempType = 'hot' : tempType;

        return(
           displayWeather(temp, tempType, timeDay, tempMeasure, windSpeed, detailForecast, colorMap.header)
        );     
    }
    componentDidMount() {
       // implemented commander
        program
            .version('0.1.0')
            .description('An application for current weather')
            .option('-x, --latitude <decimal>', 'Add latitude to be searched', '42.349295')
            .option('-y, --longitude <decimal>', 'Add longitude to be searched', '-71.048731')
        
        program.parse(process.argv);

        let lat = program.latitude;
        let lon = program.longitude;

        let self = this;

        weather.readByCoordinates(lat, lon)        
            .then(res => {
                self.setState({
                    periods: res
                });
        })
            .catch(err => {
                const objErr = err.response;
                displayError(objErr)
            });
    }
}


render(<WeatherBar/>)