// var myVariable = 2;
// var MyVariable = 3;
// console.log(myVariable.MyVariable);
// console.log(`<h1>${myName}<h1>`);

// // Function declaration
// function greet(name) {
//     return 'Hello, ' + name + '!';
//   }
  
//   // Function expression
//   var greet = function(name) {
//     return 'Hello, ' + name + '!';
//   };


// //   Control Structure:
// var x = 10;
// if (x > 5) {
//   console.log('x is greater than 5');
// } else {
//   console.log('x is less than or equal to 5');
// }


// // Regular For
// const array = [1, 2, 3, 4]
// for (let i = 0; i < myArray.length; i++){
//     console.log(myArray[i]);
// }

// // For...in (For Each) -- Show the key

// console.log('\nfor...in')
// for (let value of myArray){
//     console.log(key, myArray[key])
// }

// // For...of (For Each) -- Show the Value

// console.log('\nfor...of')
// for (let value of myArray){
//     console.log(value)

// }

// // Objects and JSON

// var person = {
//     name: 'John',
//     age: 30,
//     isStudent: false,
//     address: {
//       street: '123 Main St',
//       city: 'New York',
//       zip: '10001'
//     }
//     toString: function(){
//         return `My name is ${this.name}, and I live in ${this.address.city}.`;
//     }
//   };

//   console.log('\n', person.toString());
//   console.log(person.address.city);

//   var jsonString = JSON.stringify(person);
//   console.log('\n', JSON.stringify(person));
//   console.log('\n', JSON.parse(person));


// let value = 10;
// console.log(value);
// value = 20;
// console.log(value);


// const value = {name:'Aasif'};



// Function Hoisting:
// Function declarations are also hoisted. You can call the sayHello function before its declaration because the entire function is hoisted to the top.
// sayHello(); // "Hello, world!"  

// function sayHello() {  
//   console.log("Hello, world!");  
// }  

let x = 10;
console.log(typeof x);

x = 'Aasif';
console.log(typeof x);


function add(a, b);{
     console.log(arguments)
}

console.log(add(9,44,55,66,77))

// Forms for next week

const submitform =(event) =>{
    // do stuff
}

document.addEventListener('click', (event) => {

}) 