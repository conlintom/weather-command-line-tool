const React = require('react');
const {render, Box} = require('ink');
const TextInput = require('ink-text-input');

// Create search query class
class SearchQuery extends React.Component{
    constructor(){
        super();

        this.state = {
            query: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
			<Box>
				<Box marginRight={1}>
					Enter the Latitude and Longitude you would like to search for:
				</Box>

				<TextInput
                    value={this.state.query}
					onChange={this.handleChange}
				/>
			</Box>
		);
    }
    handleChange(query) {
		this.setState({query});
    } 
}
render(<SearchQuery/>);