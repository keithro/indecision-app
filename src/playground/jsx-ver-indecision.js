console.log('app.js is running!');

// JSX - JavaScript XML
// --------------------

const app = {
	title: 'Indecision App',
	subtitle: 'Put your life in the hands of a computer',
	options: []
};

// Submit function
const onFormSubmit = (e) => {
	// prevent entrire page from reloading
	e.preventDefault();
	// retreive value from form
	const option = e.target.elements.option.value;
	// if there is a value present push to options array and rerender page
	if (option) {
		app.options.push(option);
		e.target.elements.option.value = '';
		render();
	}
};

// Reset function
const onRemoveAll = () => {
	app.options = [];
	render();
};

const onMakeDecision = () => {
	const randomNum = Math.floor(Math.random() * app.options.length);
	const option = app.options[randomNum];
	alert(option);
};

// Setting appRoot variable to the div with id=app in index.html
const appRoot = document.getElementById('app');

// Render page function
const render = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle && <p>{app.subtitle}</p>}
			<p>{app.options.length > 0 ? 'Here are your options' : 'No options available'}</p>
			<button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
			<button onClick={onRemoveAll}>Remove All</button>
			<ol>
				{
					/* map over app.options getting back list of lis  */
					app.options.map((option) => <li key={option}>{option}</li>)
				}
			</ol>
			<form onSubmit={onFormSubmit}>
				<input type="text" name="option"/>
				<button>Add Option</button>
			</form>
		</div>
	);
	// rendering the template above to appRoot
	ReactDOM.render(template, appRoot);
	// // could put all on one line with:
	// ReactDOM.render(template, document.getElementById('app'));
};

render();

