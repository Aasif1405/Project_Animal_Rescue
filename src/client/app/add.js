// To make sure the page is working correctly 
 console.log('we are on the add page');


// Submit form(form Submission Handling)
 document.getElementById('animalForm').addEventListener('submit', submitAnimalForm);


// Check if take a single parameter
function submitAnimalForm ( event ){
    // Prevent the default action from happening 
    event.preventDefault();
    // get a reference to the form (form the event)
    const animalForm = event.target;
    // validate the form 
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid\
    if (valid){
        console.log('we are good');
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        putAnimalInStorage(animalObject);



    // do nothing if it's not 
    }else{
        console.log('we are not good');
    }
     
}

// validate the animal form 
// validateAnimalForm function, using === ensures that the comparison is strictly for an empty string. This is important for accurately validating that the name input field is not left blank, thereby providing a reliable check before further processing or submitting the form -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality.
function validateAnimalForm ( form ){ 
    let valid = true;
    // test that name is valid
    const name = form.name.value
    const eleNameError = form.name.nextElementSibling
        if (name === ""){
            eleNameError.classlist.remove('d-none');
            eleNameError.textContent = "you must name this animal"
            valid = false;
    } else{
        eleNameError.classList.add('d-none');
    }

 // test that breed os valid
const breed = form.breed.value;
const eleBreedError = form.breed.nextElementSibling;
if (breed === "") {
    eleBreedError.classList.remove('d-none');
    eleBreedError.textContent = "What type of animal is this?";
    valid = false;
} else {
    eleBreedError.classList.add('d-none');
}
// test that legs os valid
const legs = form.legs.value;
const eleLegsError = form.legs.nextElementSibling;
if (legs === "") {
    eleLegsError.classList.remove('d-none');
    eleLegsError.textContent = "How many legs does the animal have?";
    valid = false;
} else if(isNaN(legs)){   //-- The isNaN function takes a single argument and returns
    eleLegsError.classList.remove('d-none');
    eleLegsError.textContent = "This must be a number.";
    valid = false;
}else {
    eleLegsError.classList.add('d-none');
}
// test that eyes os valid
const eyes = form.eyes.value;
const eleEyesError = form.eyes.nextElementSibling;
if (eyes === "") {
    eleEyesError.classList.remove('d-none');
    eleEyesError.textContent = "How many eyes does this animal have?";
    valid = false;
} else if(isNaN(eyes)){   //-- The isNaN function takes a single argument and returns
    eleEyesError.classList.remove('d-none');
    eleEyesError.textContent = "This must be a number.";
    valid = false;
}else {
    eleEyesError.classList.add('d-none');
}

// test that sound os valid
    const sound = form.sound.value;
    form.sound.nextElementSibling
    if (sound == ""){
        eleSoundError.classlist.remove('d-none');
        eleSoundError.textContent = "What sound the animal produce? "
        valid = false;
} else{ 
    eleNameError.classList.add('d-none');
}

    // return if the form is valid or not 
    return valid

}

//  Write a function that stores the animal in local storage
// look in local storage to see if there's animals
function putAnimalInStorage(animal) {
    // if there is, get a reference to this array (JSON.parse)
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
     // add your animal to the array
    animals.push(animal);
    // then re-set storage to the new array
    localStorage.setItem('animals', JSON.stringify(animals));
}
 
    // Check if animal name already exists
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    if (animals.some(animal => animal.name.toLowerCase() === name.toLowerCase())) {
        nameError.classList.remove('d-none');
        nameError.textContent = "An animal with this name already exists";
        valid = false;
    }

// For reference purposes: -- Chatgpt (Understandable explanation for the purpose I used)


// Line 1: This line retrieves the stored animals from the local storage and parses them into an array.
// localStorage.getItem('animals'): This retrieves the item with the key 'animals' from the local storage. If the key does not exist, it returns null.
// JSON.parse(...): This parses the JSON string retrieved from local storage into a JavaScript array or object. If localStorage.getItem('animals') is null, JSON.parse(null) would also return null.
// || []: The logical OR (||) operator is used here to provide a fallback. If JSON.parse(localStorage.getItem('animals')) is null, the empty array ([]) will be assigned to const animals. This ensures that animals is always an array.


// Line 2:
// if (animals.some(animal => animal.name.toLowerCase() === name.toLowerCase())) {
// Purpose: This line checks if there is already an animal with the same name (case-insensitive) in the animals array.
// animals.some(...): The .some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true or false.
// animal => animal.name.toLowerCase() === name.toLowerCase(): This is an arrow function used as the test function for .some(). It compares the lowercase version of each animal's name with the lowercase version of the input name:
// animal.name.toLowerCase(): Converts the name property of the current animal object to lowercase.
// name.toLowerCase(): Converts the input name to lowercase.
// ===: Strict equality operator to check if the lowercase names are exactly equal.

// Line 3:
// Purpose: These lines execute if the previous if condition is true (i.e., an animal with the same name already exists).
// nameError.classList.remove('d-none');: This removes the d-none class from the nameError element, making it visible (assuming d-none is a class that hides the element).
// nameError.textContent = "An animal with this name already exists";: This sets the text content of the nameError element to the specified error message, informing the user that an animal with this name already exists.
// valid = false;: This sets the valid variable to false, indicating that the form validation has failed due to the duplicate animal name.





