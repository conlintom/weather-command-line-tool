
const React = require('react');
const {render, Box} = require('ink');
const TextInput = require('ink-text-input')

class LatLonInput extends React.Component {
	constructor() {
		super();

		this.state = {
			input: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	render() {
        const loading = "Loading"; 
        const val = (this.state.input).length ? JSON.stringify(input) : loading;
        const change = this.handleChange;
		return (    
			<Box>
				<Box>
					Enter your query:
				</Box>
                <TextInput 
                    value = {val}
                    change = {onChange}
                />
			</Box>
		);
	}
	handleChange(input) {
		this.setState({input});
	}
}
render(<LatLonInput/>);