import express from 'express';
import { router } from './routes/router.js';
import { animalRoutes } from './routes/animal.js';
import mongoose from 'mongoose';

const PORT = 3000;

const server = express();

server.use(router);
server.use(animalRoutes);

 try{
     //Connect to the database
   await mongoose.connect("mongodb://localhost:27017/inft2202")
    console.log('Connected to the database!');
    //to start the port
    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
 } catch (error) {
   console.log('Failed to connect the database', error);
   process.exit(1);

 };

