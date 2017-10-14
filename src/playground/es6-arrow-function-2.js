// const fullName = 'Keith Rodriguez';

// const getFirstNameL = (fullName) => {
//   return fullName.split(" ")[0];
// };

// const getFirstNameS = (fullName) => fullName.split(" ")[0];

// console.log('first name from long ver: ', getFirstNameL(fullName));
// console.log('first name from short ver: ', getFirstNameS(fullName));

// =======================

// arguements object - no longer bound with arrow functions

// arguments available in function
const add = function (a, b) {
	console.log(arguments + 'from function');
	return a + b;
}
console.log(add(55, 1, 100));

// arguments not available in arrow function **what about in strict mode?**
const addArrow = (a, b) => {
	// console.log(arguments + 'from arrow function');
	return a + b;
}
console.log(addArrow(55, 1, 100));

// this keyword - no longer bound with arrow functinos but rather uses this of context they were created in (the parent scope)

// ES5 syntax
const user = {
	name: 'Keith',
	cities: ['Austin', 'New York', 'San Diego'],
	printPlacesLived: function () {
		this.cities.forEach((city) => {
			console.log(this.name + ' has lived in ' + city);
		});
	}
};
console.log('ES5 function:');
user.printPlacesLived();

// ES6 syntax - allows use of methods (remove word "function")
const user2 = {
	name: 'Keith',
	cities: ['Austin', 'New York', 'San Diego'],
	printPlacesLived() {
		// this.cities.forEach((city) => {
		// 	console.log(this.name + ' has lived in ' + city);
		// });

		// here we can also use map function to return array of modified values for each element in array
		return this.cities.map((city) => this.name + ' has lived in ' + city);
		
		
	}
};
console.log('ES6 map function:')
console.log(user2.printPlacesLived());


// CHALLENGE AREA

const multiplier = {
	numbers: [1, 3, 5],
	multiplyBy: 2,
	multiply() {
		return this.numbers.map((number) => number * this.multiplyBy);
	}
};
console.log(multiplier.multiply());
