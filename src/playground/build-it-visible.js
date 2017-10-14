class VisibilityToggle extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
		this.state = {
			visibility: false
		};
	}
	handleToggleVisibility () {
		this.setState((prevState) => {
			return {
				visibility: !prevState.visibility
			}
		});
	}
	render () {
		return (
			<div>
				<h1>Visibility Toggle</h1>
				<button onClick={this.handleToggleVisibility}>
					{this.state.visibility ? 'Hide details' : 'Show details'}
				</button>
				{this.state.visibility && (
					<div>
						<p>Hey! These are some details you cannot see.</p>
					</div>
				)}
			</div>
		);
	}
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));


// // =============
// //  Version One
// // =============

// const app = {
// 	title: 'Visibility Toggle',
// 	details: 'Hey! These are some details you cannot see.',
// 	visibility: false
// };

// const toggleVisibility = () => {
// 	app.visibility = !app.visibility;
// 	render();
// };

// const appRoot = document.getElementById('app');

// const render = () => {
// 	const template = (
// 		<div>
// 			<h1>{app.title}</h1>
// 			<button onClick={toggleVisibility}>
// 				{app.visibility ? 'Hide details' : 'Show details'}
// 			</button>
// 			{app.visibility && (
// 				<div>
// 					<p>{app.details}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// 	ReactDOM.render(template, appRoot);
// };

// render();

