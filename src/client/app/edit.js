import { findAnimal, updateAnimal } from './animals.service.js';
import { validateAnimalForm } from './add.js'; // Reusing the validation method

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animalName = urlParams.get('name');

    if (animalName) {
        setupEditForm(animalName);
    }
});

function setupEditForm(name) {
    const animal = findAnimal(name);
    if (!animal) {
        alert('Animal not found!');
        window.location.href = 'list.html';
        return;
    }

    const heading = document.querySelector('h1');
    heading.textContent = 'Edit Animal';

    const animalForm = document.getElementById('animal-form');
    animalForm.name.value = animal.name;
    animalForm.species.value = animal.species;
    animalForm.age.value = animal.age;
    animalForm.name.disabled = true;

    animalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitEditForm(event, animalForm);
    });
}

function submitEditForm(event, form) {
    event.preventDefault();
    if (validateAnimalForm(form)) {
        const animal = {
            name: form.name.value,
            species: form.species.value,
            age: form.age.value
        };
        const success = updateAnimal(animal);
        if (success) {
            window.location.href = 'list.html';
        } else {
            alert('Failed to update animal.');
        }
    }
}
