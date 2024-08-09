import Navigo from 'navigo';
import 'bootstrap';
import './scss/styles.scss';

import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';
import HomeComponent from './app/components/home/home.js';
import AboutComponent from './app/components/about/about.js';

import './img/Image.jpg';


console.log("Hello World!");

export const router = new Navigo('/');

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();


    router
    .on('/', HomeComponent)
    .on('/about', AboutComponent)
    .resolve();

});
