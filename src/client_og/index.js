import 'bootstrap';
import './scss/styles.scss';

import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';

import './img/Image.jpg';


console.log("Hello World!");

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();
});
