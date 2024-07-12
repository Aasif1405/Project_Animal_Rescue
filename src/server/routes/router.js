import express, { response } from 'express';
export const router = express.Router();


router.get('/', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('home page');

});

router.get('/about', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('About Me');

});

router.get('/contact', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('Contact Page');

});
