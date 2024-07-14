const BASE_URL = 'https://inft2202.paclan.net/api/animals';
const API_KEY = 'http://127.0.0.1:5500/inft-2202-ice/src/client/list.html';

const headers = {
    'Content-Type': 'application/json',
    'apikey': API_KEY
};

// Helper function to check response status
async function checkResponse(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Unknown error');
    }
    return response.json();
}

// Fetch a list of animals
export async function getAnimals(page = 1, perPage = 5) {
    const response = await fetch(`${BASE_URL}?page=${page}&perPage=${perPage}`, { headers });
    return checkResponse(response);
}

// Save a new animal
export async function saveAnimal(animal) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(animal)
    });
    return checkResponse(response);
}

// Find a specific animal by name
export async function findAnimal(animalName) {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(animalName)}`, { headers });
    return checkResponse(response);
}

// Update an existing animal
export async function updateAnimal(updatedAnimal) {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(updatedAnimal.name)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedAnimal)
    });
    return checkResponse(response);
}

// Delete an animal
export async function deleteAnimal(animalName) {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(animalName)}`, {
        method: 'DELETE',
        headers
    });
    return checkResponse(response);
}
