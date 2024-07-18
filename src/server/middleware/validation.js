import { validationResult } from 'express-validator';

function doValidation (request, response, next){
    const result = validationResult(request);
    if (result.isEmpty()) { return next();}
    response.status(409).json ({errors: result.array()});


}

export function CheckValidation (rules){
    return [ rules, doValidation];
}