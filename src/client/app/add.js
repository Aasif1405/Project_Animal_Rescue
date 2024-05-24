
import { getAnimals, saveAnimal } from "./app/animal.service";

console.log(getAnimals());

// To make sure the page is working correctly 
console.log('we are on the add page');

// Submit form(form Submission Handling)
document.getElementById('animalForm').addEventListener('submit', submitAnimalForm);

// Check if take a single parameter
function submitAnimalForm(event) {
    // Prevent the default action from happening 
    event.preventDefault();
    // get a reference to the form (form the event)
    const animalForm = event.target;
    // validate the form 
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('we are good');
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
        console.log('we are not good');
    }
}

// validate the animal form 
function validateAnimalForm(form) {
    let valid = true;

    // test that name is valid
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // test that breed is valid
    const breed = form.breed.value;
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "What type of animal is this?";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    // test that legs is valid
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

    // test that eyes is valid
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

    // test that sound is valid
    const sound = form.sound.value;
    const eleSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "What sound does the animal produce?";
        valid = false;
    } else {
        eleSoundError.classList.add('d-none');
    }

    // return if the form is valid or not 
    return valid;
}
