const React = require('react');
const {render, Box, Color, Text, Static} = require('ink');
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


function displayWeather(perObj) {
    const perObjList = perObj.list
    return(
        <Box flexDirection='column'>
            {perObjList.map(item => (
                <Box key={item.dt_txt}>Date/Time={item.dt_txt}</Box>,
                <Box marginRight={1} key={item.main.temp}>Temp={item.main.temp}</Box>
            ))}
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