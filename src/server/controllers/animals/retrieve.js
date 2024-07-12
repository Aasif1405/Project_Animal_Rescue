import { response } from "express";
import Animal from "../../models/Animal.js";

const handle = async (request, reponse, next) => {
    try{
        // Animal.findOneAndUpdate(...) //https://mongoosejs.com/docs/tutorial/
        // Animal.findOneAndDelete(...)
        const animal = Animal.findOne({
            _id: request.params.animalId
        });
        response.json(animal);
    } catch (error) {
        next(error);

    }
};

export default { handle };