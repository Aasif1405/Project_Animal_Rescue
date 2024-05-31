import { getAnimals, deleteAnimalService } from './animal.service.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Create and append a message box to the document body
    const messageBox = document.createElement('div');
    messageBox.id = 'message-box';
    document.body.appendChild(messageBox);

    // Get references to the animal table and its body
    const animalTable = document.getElementById('animals-list');
    const animalTableBody = animalTable.querySelector('tbody');

    try {
        // Fetch the list of animals from storage
        const animals = getAnimals();

        if (animals.length === 0) {
            // If no animals are found, display the message box and hide the table
            messageBox.style.display = 'block';
            messageBox.textContent = 'No animals found.';
            animalTable.style.display = 'none';
        } else {
            // If animals are found, hide the message box and display the table
            messageBox.style.display = 'none';
            animalTable.style.display = 'table';
            // Populate the table with animal data
            drawAnimalTable(animals);
        }
    } catch (error) {
        // Handle any errors that occur while fetching animals
        console.error('Error fetching animals:', error);
        messageBox.textContent = 'Error fetching animals. Please try again later.';
        messageBox.style.display = 'block';
    }
});

function drawAnimalTable(animals) {
    // Get a reference to the table body and clear its contents
    const animalTableBody = document.querySelector('#animals-list tbody');
    animalTableBody.innerHTML = '';

    // Loop through each animal and create a row in the table
    animals.forEach(animal => {
        const row = animalTableBody.insertRow();

        // Insert cells for each property of the animal
        Object.values(animal).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Create a cell for action buttons (edit and delete)
        const actionCell = row.insertCell();
        addEditButton(actionCell, animal);
        addDeleteButton(actionCell, animal);
    });

    // Check to see if there are still animals in the list
    if (animals.length === 0) {
        // If no animals are left, hide the table and show the message box
        document.getElementById('message-box').classList.remove('d-none');
        document.getElementById('animals-list').classList.add('d-none');
    } else {
        // If animals are present, show the table and hide the message box
        document.getElementById('message-box').classList.add('d-none');
        document.getElementById('animals-list').classList.remove('d-none');
    }
}

function addEditButton(cell, animal) {
    // Create an edit button and set its properties
    const editButton = document.createElement('a');
    editButton.classList.add('btn', 'btn-primary', 'me-2');
    editButton.href = `add.html?name=${encodeURIComponent(animal.name)}`;
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    // Append the edit button to the cell
    cell.appendChild(editButton);
}

function addDeleteButton(cell, animal) {
    // Create a delete button and set its properties
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    // Add an event listener to handle the delete action
    deleteButton.addEventListener('click', async () => {
        await deleteAnimal(animal.name);
        location.reload(); // Reload the page after deletion
    });
    // Append the delete button to the cell
    cell.appendChild(deleteButton);
}

async function deleteAnimal(animalName) {
    try {
        // Call the service to delete the animal by name
        await deleteAnimalService(animalName);
        location.reload(); // Reload the page after successful deletion
    } catch (error) {
        // Handle any errors that occur during deletion
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
