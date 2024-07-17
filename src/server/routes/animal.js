import express, { response } from 'express';
import AnimalsCreateController from '../controllers/animals/create.js';
import AnimalsRetrieveController from '../controllers/animals/retrieve.js';
import AnimalsUpdateController from '../controllers/animals/update.js';
import AnimalsDeleteController from '../controllers/animals/delete.js';
import AnimalsSearchController from '../controllers/animals/search.js';

export const animalRoutes = express.Router();


animalRoutes.get('/animals', AnimalsSearchController.handle);
// Create

animalRoutes.post('/animals', AnimalsCreateController.handle);
// Retrieve

animalRoutes.get('/animals/:animalId', AnimalsRetrieveController.handle);

// Update

animalRoutes.update('/animals/:animalId', AnimalsUpdateController.handle);
// Delete
animalRoutes.delete('/animals/:animalId', AnimalsDeleteController.handle);