export function getAnimals() {
    // Look in local storage to see if there are animals
    let animals;
    // If there are, get a reference to this array (JSON.parse)
    if (localStorage.getItem('animals')) {
        animals = JSON.parse(localStorage.getItem('animals')); // we expect this to be an array
    } else {
        animals = [];
    }
    return animals;
}

/*
 *
 */
export function saveAnimal(animal) {
    // Get a list of animals
    const animals = getAnimals();
    // See if this animal already exists
    if (animals.find(a => a.name.toLowerCase() === animal.name.toLowerCase())) {
        // Throw an error if the animal already exists
        throw new Error('Animal already exists');
    }
    // If it doesn't, add it to the array
    animals.push(animal);
    // And save it in storage again
    localStorage.setItem('animals', JSON.stringify(animals));
    // Tell the caller all was well
    return true;
}

/*
 *
 */
export function findAnimal(animalName) {
    // Get a list of animals
    const animals = getAnimals();
    // Find and return the animal
    return animals.find(animal => animal.name.toLowerCase() === animalName.toLowerCase());
}

/*
 *
 */
export function updateAnimal(updatedAnimal) {
    // Get a list of animals
    const animals = getAnimals();
    // Find the index of the animal we're trying to update
    const index = animals.findIndex(animal => animal.name.toLowerCase() === updatedAnimal.name.toLowerCase());
    // If the animal doesn't exist, throw an error
    if (index === -1) {
        throw new Error('Animal not found');
    }
    // Use the index to update the fields for the selected animal
    animals[index] = updatedAnimal;
    // Put the new list back into storage
    localStorage.setItem('animals', JSON.stringify(animals));
    // Return true if everything is good
    return true;
}

/*
 *
 */
export function deleteAnimal(animalName) {
    // Get a list of animals
    let animals = getAnimals();
    // Find the index of the animal we're trying to delete
    const index = animals.findIndex(animal => animal.name.toLowerCase() === animalName.toLowerCase());
    // If the animal doesn't exist, throw an error
    if (index === -1) {
        throw new Error('Animal not found');
    }
    // Cut the selected animal out of the list
    animals.splice(index, 1);
    // Put the new list back into storage
    localStorage.setItem('animals', JSON.stringify(animals));
    // Return true if everything is good
    return true;
}

export function deleteAnimalService(animalName) {
    return deleteAnimal(animalName);
}


// const BASE_URL = 'https://inft2202.paclan.net/api/animals';
// const API_KEY = 'http://127.0.0.1:5500/inft-2202-ice/src/client/list.html';

// const headers = {
//     'Content-Type': 'application/json',
//     'apikey': API_KEY
// };

// // Helper function to check response status
// async function checkResponse(response) {
//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Unknown error');
//     }
//     return response.json();
// }

// export async function getAnimals(page = 1, perPage = 5) {
//     const response = await fetch(`${BASE_URL}?page=${page}&perPage=${perPage}`, { headers });
//     return checkResponse(response);
// }

// export async function saveAnimal(animal) {
//     const response = await fetch(BASE_URL, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(animal)
//     });
//     return checkResponse(response);
// }

// export async function findAnimal(animalName) {
//     const response = await fetch(`${BASE_URL}/${encodeURIComponent(animalName)}`, { headers });
//     return checkResponse(response);
// }

// export async function updateAnimal(updatedAnimal) {
//     const response = await fetch(`${BASE_URL}/${encodeURIComponent(updatedAnimal.name)}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify(updatedAnimal)
//     });
//     return checkResponse(response);
// }

// export async function deleteAnimal(animalName) {
//     const response = await fetch(`${BASE_URL}/${encodeURIComponent(animalName)}`, {
//         method: 'DELETE',
//         headers
//     });
//     return checkResponse(response);
// }
