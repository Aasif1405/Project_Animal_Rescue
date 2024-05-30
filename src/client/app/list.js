// I have to make it work functionally and I was not feeling well from couple of day I need some time to complete it make it.

import { getAnimals, saveAnimal, findAnimal, updateAnimal } from "./animal.service.js";

console.log(getAnimals());

// To make sure the page is working correctly
console.log('We are on the add page');

// Check if there's a name parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const animalName = urlParams.get('name');

// Set up the form based on whether we are adding or editing
if (animalName) {
    setupEditForm(animalName);
} else {
    document.getElementById('animal-form').addEventListener('submit', submitAnimalForm);
}

// Function to set up the form for editing an existing animal
function setupEditForm(name) {
    const animal = findAnimal(name);
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

    // Disable the name field
    animalForm.name.disabled = true;

    // Add an event listener for form submission
    animalForm.addEventListener('submit', submitEditForm);
}

// Function to handle form submission for adding a new animal
function submitAnimalForm(event) {
    event.preventDefault();
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm);
    if (valid) {
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        const saved = saveAnimal(animalObject);

        if (saved) {
            animalForm.reset();
            document.getElementById('animalError').textContent = '';
        } else {
            document.getElementById('animalError').textContent = 'Animal already exists.';
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
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        const updated = updateAnimal(animalObject);

        if (updated) {
            window.location.href = 'list.html';
        } else {
            document.getElementById('animalError').textContent = 'Failed to update animal.';
        }
    } else {
        console.log('Form validation failed.');
    }
}

// Validate the animal form
function validateAnimalForm(form) {
    let valid = true;

    // Test that name is valid
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Test that breed is valid
    const breed = form.breed.value;
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "What type of animal is this?";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    // Test that legs is valid
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

    // Test that eyes is valid
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

    // Test that sound is valid
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
 

import { getAnimals, deleteAnimalService } from './animals.service.js';

document.addEventListener('DOMContentLoaded', async () => {
    const messageBox = document.createElement('div');
    messageBox.id = 'message-box';
    document.body.appendChild(messageBox);
    
    const animalTable = document.getElementById('animals-list');
    const animalTableBody = animalTable.querySelector('tbody');

    try {
        const animals = getAnimals();

        if (animals.length === 0) {
            messageBox.style.display = 'block';
            messageBox.textContent = 'No animals found.';
            animalTable.style.display = 'none';
        } else {
            messageBox.style.display = 'none';
            animalTable.style.display = 'table';
            drawAnimalTable(animals);
        }
    } catch (error) {
        console.error('Error fetching animals:', error);
        messageBox.textContent = 'Error fetching animals. Please try again later.';
        messageBox.style.display = 'block';
    }
});

function drawAnimalTable(animals) {
    const animalTableBody = document.querySelector('#animals-list tbody');
    animalTableBody.innerHTML = '';

    animals.forEach(animal => {
        const row = animalTableBody.insertRow();

        Object.values(animal).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionCell = row.insertCell();
        addEditButton(actionCell, animal);
        addDeleteButton(actionCell, animal);
    });
}

function addEditButton(cell, animal) {
    const editButton = document.createElement('a');
    editButton.classList.add('btn', 'btn-primary', 'me-2');
    editButton.href = `add.html?name=${encodeURIComponent(animal.name)}`;
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    cell.appendChild(editButton);
}

function addDeleteButton(cell, animal) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteButton.addEventListener('click', () => {
        deleteAnimal(animal.name);
    });
    cell.appendChild(deleteButton);
}

async function deleteAnimal(animalName) {
    try {
        deleteAnimalService(animalName);
        location.reload();
    } catch (error) {
        console.error('Error deleting animal:', error);
        alert('Failed to delete the animal. Please try again.');
    }
}



// // Class code 
// import{ getAnimals, saveAnimal  } from "./animal.service";

// document.addEventListener('DOMContentLoaded', function() {
//     const animals = getAnimals();
//     drawAnimalsTable(animals);
// });
 

// function drawAnimalsTable(animals) {
//     const tableBody = document.querySelector('table tbody');
   
   
 
//     animals.forEach(animal => {
   
//     const row = tableBody.insertRow();
   
//     const nameCell = row.insertCell();
//     nameCell.textContent = animal.animalName;
 
//     const breedCell = row.insertCell();
//     breedCell.textContent = animal.animalBreed;
 
//     const eyesCell = row.insertCell();
//     eyesCell.textContent = animal.animalEyes;
 
//     const legsCell = row.insertCell();
//     legsCell.textContent = animal.animalLegs;
 
//     const soundCell = row.insertCell();
//     soundCell.textContent = animal.animalSound;
 
//     //Delete Button
//     const deleteCell = row.insertCell();
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.className = 'btn btn-danger btn-sm';
//     deleteButton.addEventListener('click', function() {
//         deleteAnimal(animal.animalName);
//     });
//     deleteCell.appendChild(deleteButton);
 
//     //Edit Button
//     const editCell = row.insertCell();
//     const editButton = document.createElement('button');
//     editButton.textContent = 'Edit';
//     editButton.className = 'btn btn-primary btn-sm';
//     editButton.addEventListener('click', function() {
//         updateAnimal(animal.animalName);
//     });
//     editCell.appendChild(editButton);
 
//     });
// }
