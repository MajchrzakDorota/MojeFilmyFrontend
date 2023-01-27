import { createApp } from 'vue';

import App from './App.vue';
import MovieElement from './components/MovieElement.vue';
import BaseButton from './components/UI/BaseButton.vue'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";



const app = createApp(App);

app.component('movie-element', MovieElement);
app.component('base-button', BaseButton);

app.mount('#app');
