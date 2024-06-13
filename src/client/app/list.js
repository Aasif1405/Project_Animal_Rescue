import { getAnimals, deleteAnimalService } from './animal.service.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Create and append a message box to the document body
    const messageBox = document.createElement('div');
    messageBox.id = 'message-box';
    messageBox.className = 'alert alert-danger d-none';
    document.body.appendChild(messageBox);

    const animalTable = document.getElementById('animals-list');
    const animalTableBody = animalTable.querySelector('tbody');

    try {
        // Fetch the list of animals from storage that is from add.js
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
            // renderTable helps to display the animal in the table after fetching 
            renderTable(animals);
        }
    } catch (error) {
        // error handling when fetching the animal
        console.error('Error fetching animals:', error);
        messageBox.textContent = 'Error fetching animals. Please try again later.';
        messageBox.style.display = 'block';
    }
});

function renderTable(animals) {
    const perPage = 5;
    const totalPages = Math.ceil(animals.length / perPage);
    let currentPage = 1;

    function drawAnimalTable(page = 1) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedAnimals = animals.slice(start, end);
        const animalTableBody = document.querySelector('#animals-list tbody');
        animalTableBody.innerHTML = '';

        paginatedAnimals.forEach(animal => {
            const row = animalTableBody.insertRow();

            Object.values(animal).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });

            const actionCell = row.insertCell();
            addEditButton(actionCell, animal);
            addDeleteButton(actionCell, animal);
        });

        //  tooltips for edit and delete button
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        renderPagination(page, totalPages);
    }

    function renderPagination(currentPage, totalPages) {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                drawAnimalTable(currentPage);
            });
            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }

    drawAnimalTable(currentPage);
}

function addEditButton(cell, animal) {
    const editButton = document.createElement('a');
    editButton.classList.add('btn', 'btn-primary', 'me-2');
    editButton.href = `add.html?name=${encodeURIComponent(animal.name)}`;
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.setAttribute('data-bs-toggle', 'tooltip');
    editButton.setAttribute('data-bs-placement', 'top');
    editButton.setAttribute('title', 'Edit this animal');
    cell.appendChild(editButton);
}

function addDeleteButton(cell, animal) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteButton.setAttribute('data-bs-toggle', 'tooltip');
    deleteButton.setAttribute('data-bs-placement', 'top');
    deleteButton.setAttribute('title', 'Delete this animal');
    deleteButton.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        const confirmButton = document.getElementById('confirmDelete');

        confirmButton.onclick = async () => {
            try {
                await deleteAnimal(animal.name);
                location.reload(); 
            } catch (error) {
                console.error('Error deleting animal:', error);
                alert('Failed to delete the animal. Please try again.');
            }
        };

        modal.show();
    });
    cell.appendChild(deleteButton);
}
// This reload the page and bring to the current page after the the animal is get deleted- In case of pagination and delete model confirmation
async function deleteAnimal(animalName) {
    try {
        await deleteAnimalService(animalName);
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
