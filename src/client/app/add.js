// Import necessary functions from animal.service.js
import { getAnimals, saveAnimal, findAnimal, updateAnimal } from "./animal.service.js";

// Log the current list of animals and a message to ensure the script is running
console.log(getAnimals());
console.log('We are on the add page');

// Check if there's a name parameter in the URL (indicates editing an existing animal)
const urlParams = new URLSearchParams(window.location.search);
const animalName = urlParams.get('name');

// Set up the form based on whether we are adding or editing
if (animalName) {
    setupEditForm(animalName); 
} else {
    // If name parameter does not exist, add event listener for form submission
    document.getElementById('animal-form').addEventListener('submit', submitAnimalForm);
}

// Function to set up the form for editing an existing animal
function setupEditForm(name) {
    try {
        const animal = findAnimal(name); // Find the animal by name
        if (!animal) {
            console.error('Animal not found!');
            return;
        }

        // Update the form heading
        document.querySelector('h1').textContent = 'Edit Animal';

        // Get references to the form elements
        const animalForm = document.getElementById('animal-form');
        animalForm.name.value = animal.name;
        animalForm.breed.value = animal.breed;
        animalForm.legs.value = animal.legs;
        animalForm.eyes.value = animal.eyes;
        animalForm.sound.value = animal.sound;

        // Disable the name field (assuming you don't want to edit the name)
        animalForm.name.disabled = true;

        // Add an event listener for form submission
        animalForm.addEventListener('submit', submitEditForm);
    } catch (error) {
        console.error('Error setting up edit form:', error.message);
    }
}

// Function to handle form submission for adding a new animal
function submitAnimalForm(event) {
    event.preventDefault(); 
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm); 

    if (valid) {
        // If form is valid, create an animal object with form data
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        try {
            saveAnimal(animalObject); 
            animalForm.reset(); 
            const animalError = document.getElementById('animalError');
            if (animalError) {
                animalError.textContent = ''; 
            }
            window.location.href = 'list.html'; 
        } catch (error) {
            // Display error message if saving fails
            const animalError = document.getElementById('animalError');
            if (animalError) {
                animalError.textContent = error.message;
            }
        }
    } else {
        console.log('Form validation failed.'); 
    }
}

// Function to handle form submission for editing an existing animal
function submitEditForm(event) {
    event.preventDefault(); 
    const animalForm = event.target; 
    const valid = validateAnimalForm(animalForm); 
    if (valid) {
        // If form is valid, create an animal object with form data
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        try {
            updateAnimal(animalObject); 
            window.location.href = 'list.html'; 
        } catch (error) {
            // Display error message if updating fails
            const animalError = document.getElementById('animalError');
            if (animalError) {
                animalError.textContent = error.message;
            }
        }
    } else {
        console.log('Form validation failed.'); 
    }
}

// Function to validate the animal form fields
function validateAnimalForm(form) {
    let valid = true;

    // Validate 'name' field
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Validate 'breed' field
    const breed = form.breed.value;
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "What type of animal is this?";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    // Validate 'legs' field
    const legs = form.legs.value;
    const eleLegsError = form.legs.nextElementSibling;
    if (legs === "") {
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "How many legs does the animal have?";
        valid = false;
    } else if (isNaN(legs)) {
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "This must be a number.";
        valid = false;
    } else {
        eleLegsError.classList.add('d-none');
    }

    // Validate 'eyes' field
    const eyes = form.eyes.value;
    const eleEyesError = form.eyes.nextElementSibling;
    if (eyes === "") {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "How many eyes does this animal have?";
        valid = false;
    } else if (isNaN(eyes)) {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "This must be a number.";
        valid = false;
    } else {
        eleEyesError.classList.add('d-none');
    }

    // Validate 'sound' field
    const sound = form.sound.value;
    const eleSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "What sound does the animal produce?";
        valid = false;
    } else {
        eleSoundError.classList.add('d-none');
    }

    // Return if the form is valid or not
    return valid;
}
