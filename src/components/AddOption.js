import React from 'react';

export default class AddOption extends React.Component {
	state = {
		error: undefined
	};	
	handleAddOption = (e) => {
		e.preventDefault();

		// retreive value from form
		const option = e.target.elements.option.value.trim();
		// since nothing is returned unless there is an error in the handleAddOption method passed down from parent we can set the as error
		const error = this.props.handleAddOption(option);

		this.setState(() => ({ error }));

		// clear input if there is no error
		if (!error) {
			e.target.elements.option.value = '';
		}
	};
	render() {
		return (
			<div>
				{this.state.error && <p className="add-option-error">{this.state.error}</p>}
				<form className="add-option" onSubmit={this.handleAddOption}>
					<input className="add-option__input" type="text" name="option" />
					<button className="button">Add Option</button>
				</form>
			</div>
		);
	}
}
