// Making sure the scripts loads properly

console.log("Hello World");

// Grab the reference of the heading.
const myHeading = document.getElementById('heading');
console.log(myHeading);
// Change the Heading 
myHeading.textContent = "This is my heading";
console.log(myHeading);


// grab a reference to the box where our 
const myContent = document.getElementById('my-content');
// create a paragraph
const p = document.createElement('p');
p.textContent = 'I made this with javascript!';
// add it to the content
myContent.append(p);


// Create a new container
let container = document.createElement("div");
// Create a another new paragraph
let p2 = document.createElement("p");
p2.textContent = "New Paragraph";
// append the paragraph to the container
container.appendChild(p2);

// Create a new span
let span = document.createElement("span");
span.textContent = "New Span";

// add the span before the paragraph
p2.before(span);
console.log(container.outerHTML);
console.log(container.innerHTML);

// Add the whole container to our content box
myContent.append(container);

// get a reference to the second div box
const divbox2 = document.getElementById('div-02');
// Delete it 
divbox2.remove();

// lets create a button
const button = document.createElement('button');
button.innerText = 'Button';
// Add it to the page
myContent.append(button);

// Listent for the click event, and then run our "button"
// button.addEventListener('click', (event) =>{
//     console.log(event);
//     alert('Button worked!');
// });

const buttonClickHandler = (event) =>{
    console.log(event.target.innerText);
    alert('Button worked!');
    // get a reference to the First div box
const divbox1= document.getElementById('div-01');
// Delete it 
divbox1.remove();
};

button.addEventListener('click', buttonClickHandler);






// Create a new element