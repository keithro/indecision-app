// stateless functional component

// manages a state so Class Based component
class IndecisionApp extends React.Component {
	// overriding constructor function to fix this binding on functinos
	constructor(props) {
		// to be sure all other properties from constructor function are included
		super(props);
		// binding this to handleDeleteOptions when component renders
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: []
		};
	}
	// componentDidMount() { //actually causes a 2nd render() so use will mount
	componentWillMount() {
		try {
			// reading state in localStorage and setting as options in our options array if there is a value present
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options })); // {options: options}
			}
		} catch (e) {
			// Do nothing if invalid and fallback on default value of []
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !==  this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
	// method to pass in to reset array
	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}
	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
					options: prevState.options.filter((option) => optionToRemove !== option)
				}));
	}
	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		alert(option);
	}
	handleAddOption(option) {
		// checks if valid string is not present
		if (!option) {
			return 'Enter valid value to add item';
			// checks is the entered options is already present in array, returning the index if it is present which would be larger than -1 
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		// the following will run w/o else{} since "return" is present in previous if/else clauses.
		this.setState((prevState) => ({
			options: prevState.options.concat(option)}));
	}
	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					// passing down reset function into reset button
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}

// subtitle only displayed if present
const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

// Stateless Functional Component
const Action = (props) => {
	return (
		<div>
			<button
				onClick={props.handlePick}
				disabled={!props.hasOptions}
				>What should I do?
			</button>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{props.options.length === 0 && <p>Please add an option to get started!</p>}
			{
				props.options.map((option) => (
					<Option
						key={option}
						optionText={option}
						handleDeleteOption={props.handleDeleteOption}
					/>
				))
			}
		</div>
	);
};

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button onClick={(e) => {
				props.handleDeleteOption(props.optionText);
			}}>
				remove
			</button>
		</div>
	);
};

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			error: undefined
		};
	}
	// handleAddOption method we are building into AddOption component
	handleAddOption(e) {
		// prevent entrire page from reloading
		e.preventDefault();
		// retreive value from form
		const option = e.target.elements.option.value.trim();
		// since nothing is returned unless there is an error in the handleAddOption method passed down from parent we can set the as error
		const error = this.props.handleAddOption(option);

		// since in ES6 we don't need error: error because they have the same name and we can put it on the same line
		this.setState(() => ({ error }));

		// clear input if there is no error
		if (!error) {
			e.target.elements.option.value = '';
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
