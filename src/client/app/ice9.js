import { renderTable, addEditButton, addDeleteButton } from './list.js';  

document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; 

    const messageBox = document.createElement('div');
    messageBox.id = 'message-box';
    messageBox.className = 'alert alert-danger d-none';
    document.body.appendChild(messageBox);

    const animalTable = document.getElementById('animals-list');
    const animalTableBody = animalTable.querySelector('tbody');

    // Call xhrAnimals, fetchAnimalsPromise, or fetchAnimalsAsync here (comment out the other two)
    // Uncomment this line to use XMLHttpRequest
    // xhrAnimals(); 
    // Uncomment this line to use fetch with then/catch
    // fetchAnimalsPromise(); 
     // Uncomment this line to use async/await
    fetchAnimalsAsync(); 
});

function drawAnimalsTable(animals, tableElement) {
    const perPage = 5;
    const totalPages = Math.ceil(animals.length / perPage);
    let currentPage = 1;

    function drawAnimalTableListPage(page = 1) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedAnimals = animals.slice(start, end);
        const animalTableBody = tableElement.querySelector('tbody');
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
                drawAnimalTableListPage(currentPage);
            });
            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }

    drawAnimalTableListPage();
}

// Function to make a GET request using XMLHttpRequest
function xhrAnimals() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/src/client/data/animals.json');
    xhr.responseType = 'json';

    xhr.onload = function () {
        if (xhr.status === 200) {
            const animals = xhr.response;
            hideSpinner();
            const animalTable = document.getElementById('animals-list');
            drawAnimalsTable(animals, animalTable);
        } else {
            console.error('Failed to fetch animals:', xhr.status);
            showMessage('Failed to fetch animals. Please try again later.');
        }
    };

    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === XMLHttpRequest.DONE) {
    //         if (xhr.status === 200) {
    //             const animals = JSON.parse(xhr.responseText);
    //             hideSpinner();
    //             const animalTable = document.getElementById('animals-list');
    //             drawAnimalsTable(animals, animalTable);
    //         } else {
    //             console.error('Failed to fetch animals:', xhr.status);
    //             showMessage('Failed to fetch animals. Please try again later.');
    //         }
    //     }
    // };

    xhr.onerror = function () {
        console.error('Failed to fetch animals:', xhr.status);
        showMessage('Failed to fetch animals. Please try again later.');
    };

    xhr.send();
}

// Function to make a GET request using fetch and then/catch
function fetchAnimalsPromise() {
    fetch('/src/client/data/animals.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            hideSpinner();
            const animalTable = document.getElementById('animals-list');
            drawAnimalsTable(data, animalTable);
        })
        .catch(error => {
            console.error('Failed to fetch animals:', error.message);
            showMessage('Failed to fetch animals. Please try again later.');
        });
}

// Function to make a GET request using async/await
async function fetchAnimalsAsync() {
    try {
        const response = await fetch('/src/client/data/animals.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        hideSpinner();
        const animalTable = document.getElementById('animals-list');
        drawAnimalsTable(data, animalTable);
    } catch (error) {
        console.error('Failed to fetch animals:', error.message);
        showMessage('Failed to fetch animals. Please try again later.');
    }
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}

function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}
