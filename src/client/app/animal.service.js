

// export function getAnimals() {
//     // Look in local storage to see if there's animals
//     let animals;
//     // If there is get a reference to this array(JSON.parse)
//     if (localStorage.getItem('animals')) {
//         animals = JSON.parse(localStorage.getItem('animals')); // we expect this to be an array
//     } else {
//         animals = [];
//     }
//     return animals;
// }

// /*
// *
// *
// */

// export function saveAnimal(animal) {
//     // get a list of animals
//     const animals = getAnimals();
//     // see if this animal already exists
//     if (animals.find(a => a.name.toLowerCase() === animal.name.toLowerCase())) {
//         // tell the caller we are not going to save this
//         return false;
//     }
//     // if it doesn't, add it to the array
//     animals.push(animal);
//     // and save it in storage again
//     localStorage.setItem('animals', JSON.stringify(animals));
//     // tell the caller all was well
//     return true;
// }



// export function deleteAnimalService(animalName) {
//     let animals = getAnimals();
//     animals = animals.filter(animal => animal.name.toLowerCase() !== animalName.toLowerCase());
//     localStorage.setItem('animals', JSON.stringify(animals));
// }

