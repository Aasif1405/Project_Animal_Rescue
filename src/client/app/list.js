// Declare totalPages variable at the top level
let totalPages; 

export function renderTable(animals) {
    const perPage = 5;
    let currentPage = 1;

    // Calculate total pages once
    totalPages = Math.ceil(animals.length / perPage);

    function drawAnimalTableListPage(page = 1) {
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

        // Tooltips for edit and delete buttons
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
                drawAnimalTableListPage(currentPage);
            });
            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }

    drawAnimalTableListPage(currentPage);
}

export function addEditButton(cell, animal) {
    const editButton = document.createElement('a');
    editButton.classList.add('btn', 'btn-primary', 'me-2');
    editButton.href = `add.html?name=${encodeURIComponent(animal.name)}`;
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.setAttribute('data-bs-toggle', 'tooltip');
    editButton.setAttribute('data-bs-placement', 'top');
    editButton.setAttribute('title', 'Edit this animal');
    cell.appendChild(editButton);
}

export function addDeleteButton(cell, animal) {
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

// This reloads the page and brings it to the current page after the animal is deleted, in case of pagination and delete modal confirmation
export async function deleteAnimal(animalName) {
    try {
        await deleteAnimalService(animalName);
        location.reload(); 
    } catch (error) {
        console.error('Error deleting animal:', error);
        alert('Failed to delete the animal. Please try again.');
    }
}
